import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'DevSecretKey';

if (process.env.JWT_SECRET === undefined) {
  console.warn('JWT_SECRET is not defined in .env file');
}

const ACCESS_TOKEN_DURATION = '1h';
const REFRESH_TOKEN_DURATION = '30 days';

const tokenDuration = {
  access_Token: ACCESS_TOKEN_DURATION,
  refresh_Token: REFRESH_TOKEN_DURATION,
} as const;

export const generateToken = async (payload: TokenPayload) => {
  const token = new Promise<string>((res, rej) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: tokenDuration[payload.type],
      },
      (err, token) => {
        if (err || !token) {
          rej(err);
          return;
        }
        res(token as string);
      }
    );
  });
  return token;
};

export const validateToken = <T>(token: string) => {
  console.log(token);
  return new Promise<DecodedToken<T>>((res, rej) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        rej(err);
      }
      res(decoded as DecodedToken<T>);
    });
  });
};

export interface AccessTokenPayload {
  type: 'access_Token';
  email: string;
  tokenId: number;
  nickname: string;
}

export interface RefereshTokenPayload {
  type: 'refresh_Token';
  tokenId: number;
  rotationCounter: number;
}

type TokenPayload = AccessTokenPayload | RefereshTokenPayload;

type DecodedToken<T> = {
  iat: number;
  exp: number;
} & T;
