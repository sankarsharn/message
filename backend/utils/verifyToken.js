import jwt from 'jsonwebtoken';

import { errorHandler } from './errorHandler.js';   

const verifyToken = (req , res , next) => {
    const token = req.cookies.access_token;
    if(!token){
       const error = new Error('Token not found');
       error.statusCode = 401;
       return errorHandler(error, next);
    }
    jwt.verify(token , process.env.JWT_SECRET, (err, user) => {
        if(err){
            const error = new Error('Invalid token');
            error.statusCode = 403;
            return errorHandler(error, next);
        }
        req.user = user;
        next();
    })
}