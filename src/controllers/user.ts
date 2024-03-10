import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { User } from "../models/user";
import jwt from 'jsonwebtoken';

require('dotenv').config;

export const newUser = async (req: Request, res: Response) => {
   //const { body } = req;
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    // Validate username not exist in db
    const userFound = await User.findOne({
                                where: { username: username}
                            })

    if (userFound) {
        return res.status(400).json({
            msg: 'User already exists!'
        })
    }

    try {

        // Saved user in db
        await User.create({
            username: username,
            password: hashPassword
        })

        res.json({
            msg: `User ${username} created successfully.`,
            //body: body
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upsss!',
            error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    
    const { username, password } = req.body;

    // Validate exist users in db
    const user:any = await User.findOne({ where: { username: username } });

    if (!user) {
        return res.status(400).json({
            msg: `Not exits user with username ${username} in db.`
        })
    }

    // Validate password from user
    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password not valid!`
        })
    }

    // Generate token
    const token = jwt.sign({
        username: username,
    }, process.env.SECRET_KEY || 'a1b2c3d4e5f6g8h9');

    res.json({ token });
}