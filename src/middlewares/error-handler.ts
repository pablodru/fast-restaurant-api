import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ApplicationError, RequestError } from '@/protocols';

export function handleApplicationErrors(
  err: RequestError | ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const isApplicationError = (error: RequestError | ApplicationError | Error): error is ApplicationError =>
    'status' in error;
  const isRequestError = (error: RequestError | ApplicationError | Error): error is RequestError => 'data' in error;

  if (isApplicationError(err) || isRequestError(err)) {
    return res.status(err.status).send({ message: err.message });
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error.',
  });
}
