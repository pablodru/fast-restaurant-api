import httpStatus from 'http-status';
import { ApplicationError } from '@/protocols';

export function unAuthorizedError(): ApplicationError {
  return {
    name: 'unAuthorizedError',
    message: `Name is missing in Headers.`,
    status: httpStatus.UNAUTHORIZED,
  };
}
