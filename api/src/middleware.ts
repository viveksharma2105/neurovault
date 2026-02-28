import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers["authorization"];
        if (!header) {
            res.status(403).json({ message: "You are not logged in" });
            return;
        }

        // Support both "Bearer <token>" and raw token formats
        const token = header.startsWith("Bearer ") ? header.slice(7) : header;
        const decoded = jwt.verify(token, JWT_PASSWORD) as { id: string };

        req.userId = decoded.id;
        next();
    } catch (e) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
