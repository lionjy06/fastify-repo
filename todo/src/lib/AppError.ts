import { Type } from '@sinclair/typebox';

type ErrorName = 'UserExistsError' | 'AuthenticationError' | 'UnknownError';

type ErrorInfo = {
  statusCode: number;
  message: string;
};

const statusCodeMap: Record<ErrorName, ErrorInfo> = {
  UserExistsError: {
    statusCode: 409,
    message: 'User Already Exist',
  },
  AuthenticationError: {
    statusCode: 401,
    message: 'Invalid username of password',
  },
  UnknownError: {
    statusCode: 500,
    message: 'error caused by unknown reason',
  },
};

export default class AppError extends Error {
  public statusCode: number;

  constructor(public name: ErrorName) {
    const info = statusCodeMap[name];
    super(info.message);
    this.statusCode = info.statusCode;
  }
}

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const appErrorSchema = Type.Object({
  name: Type.String(),
  message: Type.String(),
  statusCode: Type.Number(),
});
