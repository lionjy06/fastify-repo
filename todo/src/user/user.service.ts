import { PrismaClient, User } from '@prisma/client';
import { LoginInput, RegisterDto } from './user.schema';
import bcrypt from 'bcrypt';
import AppError, { isAppError } from '../lib/AppError';
import { generateToken } from '../lib/tokens';

const prisma = new PrismaClient();

export const getToken = async (user: User) => {
  const { id, email, nickname } = user;
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

    if (exist) throw new AppError('UserExists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = await prisma.user.create({
      data: { password: hashedPassword, email, nickname },
    });

    const token = await getToken(user);

    return { token, user };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError('WrongCredentials');
  }

  try {
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new AppError('WrongCredentials');
    }

    const token = await getToken(user);

    return {
      user,
      token,
    };
  } catch (e) {
    if (isAppError(e)) {
      throw e;
    }
    throw new AppError('Unknown');
  }
};
