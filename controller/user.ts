import {Request, Response} from 'express';
import { createUserInput } from '../schema/user';
import { createUser } from '../services/user';

export async function createUserHandler(req: Request<{}, {}, createUserInput >, res: Response){
    const body = req.body;

    try {
        const user = await createUser(body);

        return user
    } catch (error : any) {
        if(error.code === 11000){
            return res.status(409).send("User already exists");
        }
        return res.status(500).send(error);
    }
}