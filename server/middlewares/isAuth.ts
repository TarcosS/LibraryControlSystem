import { Handler } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import User from "../models/User";

declare global {
    namespace Express {
      interface Request {
        userId?: string
      }
    }
}

export const isAuth: Handler = (req, res, next) => {
    var authHeader = req.headers.authorization?.split(' ')[1];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    let decoded: any;
    try {
        decoded = jwt.verify(authHeader, process.env.JWT_SECRET_KEY as Secret);
        req.userId = decoded.id;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    next();
}