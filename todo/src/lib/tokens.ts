import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'DevSecretKey';

if (process.env.JWT_SECRET === undefined) {
  console.warn('JWT_SECRET is not defined in .env file');
}

const ACCESS_TOKEN_DURATION = '1h';
const REFRESH_TOKEN_DURATION = '1W';

const tokenDuration = {
  access_Token: ACCESS_TOKEN_DURATION,
  refresh_Token: REFRESH_TOKEN_DURATION,
} as const;

export const generateToken = async (payload: TokenPayload) => {
  return new Promise((res, rej) => {
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
        res(token);
      }
    );
  });
};

export const validateToken = <T>(token: string) => {
  return new Promise<DecodedToken<T>>((res, rej) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        rej(err);
      }
      res(decoded as DecodedToken<T>);
    });
  });
};

interface AccessTokenPayload {
  type: 'access_Token';
  email: string;
  tokenId: number;
  nickname: string;
}

interface RefereshTokenPayload {
  type: 'refresh_Token';
  tokenId: number;
  rotationCounter: number;
}

type TokenPayload = AccessTokenPayload | RefereshTokenPayload;

type DecodedToken<T> = {
  iat: number;
  exp: number;
} & T;
