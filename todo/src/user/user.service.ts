import { PrismaClient, Token, User } from '@prisma/client';
import { LoginInput, RegisterDto } from './user.schema';
import bcrypt from 'bcrypt';
import AppError, { isAppError } from '../lib/AppError';
import { RefereshTokenPayload, generateToken, validateToken } from '../lib/tokens';

const prisma = new PrismaClient();

export const getToken = async (user: User, tokenItem?: Token) => {
  const { email, nickname } = user;
  const userInfo = await prisma.user.findUnique({
    where: { email },
  });
  if (!userInfo) return;
  const token = await prisma.token.create({
    data: { userId: userInfo.id },
  });

  const tokenId = tokenItem?.id ?? token.id;

  const [access_Token, refresh_Token] = await Promise.all([
    await generateToken({
      type: 'access_Token',
      email,
      tokenId,
      nickname,
    }),
    await generateToken({
      type: 'refresh_Token',
      tokenId,
      rotationCounter: token.rotationCounter,
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

export const getRefreshToken = async (token: string) => {
  try {
    const { tokenId, rotationCounter } = await validateToken<RefereshTokenPayload>(token);

    const tokenItem = await prisma.token.findUnique({
      where: {
        id: tokenId,
      },
      include: {
        user: true,
      },
    });
    if (!tokenItem) throw new Error('Token not found');
    if (tokenItem.blocked) {
      throw new Error('token is blocked');
    }
    if (tokenItem.rotationCounter !== rotationCounter) {
      await prisma.token.update({
        where: { id: tokenItem.id },
        data: { blocked: true },
      });
      throw new Error('rotation counter does not match');
    }
    await prisma.token.update({
      where: { id: tokenItem.id },
      data: { rotationCounter: tokenItem.rotationCounter + 1 },
    });
    const tokens = await getToken(tokenItem.user, tokenItem);
    return tokens;
  } catch (e) {
    throw new AppError('RefreshFailure');
  }
};
