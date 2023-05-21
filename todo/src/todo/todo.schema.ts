import { Static, Type } from '@sinclair/typebox';

export const postTodoSchema = Type.Object({
  title: Type.String(),
  description: Type.String(),
  content: Type.String(),
  startDay: Type.String(),
  finishDay: Type.String(),
  task: Type.Array(Type.String()),
});

export const reponsePostSchema = Type.Object({
  title: Type.String(),
  description: Type.String(),
});

export type PostTodoInput = Static<typeof postTodoSchema>;
export type ResponsePost = Static<typeof reponsePostSchema>;
