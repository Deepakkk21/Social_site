import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).redirect('/auth/login'); // Redirect to login if no token is present
    }

    jwt.verify(token, 'Deep@k2110', (err:any, user:any) => {
        if (err) {
            return res.status(403).redirect('/auth/login'); // Redirect to login if token is invalid
        }

        req.user = user;
        next();
    });
};
