import { Static, Type } from '@sinclair/typebox';

export const registerSchema = Type.Object({
  email: Type.String(),
  nickname: Type.String(),
  password: Type.String(),
});

export const registerResponseSchema = Type.Object({
  email: Type.String(),
  nickname: Type.String(),
});

export type RegisterDto = Static<typeof registerSchema>;
