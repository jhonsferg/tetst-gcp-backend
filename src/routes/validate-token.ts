import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction)  => {
    const headerToken = req.headers['authorization'];

    console.log(headerToken);

    if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
        const bearerToken = headerToken.slice(7);
        
        try {
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'a1b2c3d4e5f6g8h9');
    
            console.log(bearerToken);
    
            next()
        } catch (error) {
            res.status(401).json({
                msg: 'Token invalid!'
            })
        }

    } else {
        res.status(401).json({
            msg: 'Access denied!'
        })
    }

}

export default validateToken;