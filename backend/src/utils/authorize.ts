import { Request, Response, NextFunction } from 'express';

type RoleTypes = 'admin' | 'user';

export const authorize =
  (allowedRoles: Array<RoleTypes>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userIsAllowed = allowedRoles.includes(req.user!.role);
    if (!userIsAllowed) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    next();
  };
