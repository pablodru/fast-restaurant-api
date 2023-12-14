import httpStatus from 'http-status';
import { ApplicationError } from '@/protocols';

export function notFoundError(details: string): ApplicationError {
  return {
    name: 'NotFoundError',
    message: `${details} Not Found`,
    status: httpStatus.NOT_FOUND,
  };
}