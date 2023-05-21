import { Prisma, PrismaClient, Todo } from '@prisma/client';
import { PostTodoInput } from './todo.schema';
import AppError from '../lib/AppError';

const prisma = new PrismaClient();

export const postTodo = async (
  todoInput: PostTodoInput
): Promise<Pick<Todo, 'description' | 'title'>> => {
  const { task, startDay, finishDay, ...rest } = todoInput;

  const openDate = new Date(startDay);
  const endDate = new Date(finishDay);
  if (openDate > endDate) {
    throw new AppError('BadTaskDate');
  }
  const todo = await prisma.todo.create({
    data: { startDay: openDate, finishDay: endDate, ...rest },
  });

  for await (const i of task) {
    await prisma.task.create({
      data: {
        task: i,
        todoId: todo.id,
      },
    });
  }

  return { description: todo.description, title: todo.title };
};
