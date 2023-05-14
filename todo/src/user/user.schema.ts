import { Static, Type } from '@sinclair/typebox';

export const registerSchema = Type.Object({
  email: Type.String(),
  nickname: Type.String(),
  password: Type.String(),
});

export const registerResponseSchema = Type.Object({
  user: Type.Object({
    email: Type.String(),
    nickname: Type.String(),
  }),
  token: Type.Object({
    access_Token: Type.String(),
    refresh_Token: Type.String(),
  }),
});

export type RegisterDto = Static<typeof registerSchema>;
