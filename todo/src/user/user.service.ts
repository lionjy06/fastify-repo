import { PrismaClient, User } from '@prisma/client';
import { RegisterDto } from './user.schema';
import bcrypt from 'bcrypt';
import AppError from '../lib/AppError';
import { generateToken } from '../lib/tokens';

const prisma = new PrismaClient();

export const getToken = async (email: string, nickname: string) => {
  const [access_Token, refresh_Token] = await Promise.all([
    await generateToken({
      type: 'access_Token',
      email,
      tokenId: 1,
      nickname,
    }),
    await generateToken({
      type: 'refresh_Token',
      tokenId: 1,
      rotationCounter: 1,
    }),
  ]);

  return {
    access_Token,
    refresh_Token,
  };
};

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

    const token = await getToken(user.email, user.nickname);

    return { token, user };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
