import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './user.schema';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const registerUser = async (userInfo: RegisterDto) => {
  const { password, ...rest } = userInfo;
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { password: hashedPassword, ...rest },
  });
};
