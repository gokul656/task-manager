import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function verifyToken(req: any, res: Response, next: NextFunction): any {
    const token: string | undefined = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded: any = jwt.verify(token.split(' ')[1], 'hot-sand-dogs');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export default verifyToken;
