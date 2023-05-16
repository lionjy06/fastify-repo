import { Static, Type } from '@sinclair/typebox';

export const registerSchema = Type.Object({
  email: Type.String(),
  nickname: Type.String(),
  password: Type.String(),
});

export const userSchema = Type.Object({
  user: Type.Object({
    email: Type.String(),
    nickname: Type.String(),
  }),
  token: Type.Object({
    access_Token: Type.String(),
    refresh_Token: Type.String(),
  }),
});

export const loginSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

export type RegisterDto = Static<typeof registerSchema>;
export type LoginInput = Static<typeof loginSchema>;
