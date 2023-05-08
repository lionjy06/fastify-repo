import { Response } from 'node-fetch';

interface ResponseError extends Error {
  response?: Response;
}

const handleErrors = async (response: Response) => {
  if (!response.ok) {
    const error: ResponseError = new Error(response.statusText);

    throw { message: error.message, stack: error.name };
  }
  return response;
};
export default handleErrors;
