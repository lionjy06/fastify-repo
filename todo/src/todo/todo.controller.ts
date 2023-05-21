import { FastifyReply, FastifyRequest } from 'fastify';
import { PostTodoInput } from './todo.schema';
import dayjs from 'dayjs';
import { postTodo } from './todo.service';
import { Todo } from '@prisma/client';

export const postTodoHandler = async (
  request: FastifyRequest<{ Body: PostTodoInput }>,
  reply: FastifyReply
) => {
  const todoInput = request.body;
  const todo = await postTodo(todoInput);
  reply.code(201).send(todo);
};
