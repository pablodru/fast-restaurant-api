import { Request, Response, NextFunction } from 'express';
import { unAuthorizedError } from '@/errors/unAuthorized-error';

// export default function validateName(req: Request, res: Response, next: NextFunction) {
//   const { authorization } = req.headers;
//   const name = authorization?.replace('Bearer ', '');
//   if (!name) {
//     throw unAuthorizedError();
//   }
//   res.locals.name = name;
//   next();
// }
