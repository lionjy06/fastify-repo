import { PrismaClient, User } from '@prisma/client';
import { RegisterDto } from './user.schema';
import bcrypt from 'bcrypt';
import AppError from '../lib/AppError';
const prisma = new PrismaClient();

export const registerUser = async (userInfo: RegisterDto) => {
  try {
    const { password, email, nickname } = userInfo;
    const exist = await prisma.user.findFirst({
      where: { email },
    });

    if (exist) throw new AppError('UserExistsError');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = await prisma.user.create({
      data: { password: hashedPassword, email, nickname },
    });

    return { email: user.email, nickname: user.nickname };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
