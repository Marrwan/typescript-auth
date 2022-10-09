import {Request, Response} from 'express';
import { createUserInput } from '../schema/user';
import { createUser } from '../services/user';
import sendmail from '../utils/mailer';

export async function createUserHandler(req: Request<{}, {}, createUserInput >, res: Response){
    const body = req.body;

    try {
        const user = await createUser(body);

        sendmail({
            from: "Asake@sake.com",
            to: user.email, // list of receivers
            subject: "Hello 👻✔ verify your account", // Subject line
            text: `Hello world? ${user.verificationToken}, Id: user.id`, // plain text body

        })
        return user
    } catch (error : any) {
        if(error.code === 11000){
            return res.status(409).send("User already exists");
        }
        return res.status(500).send(error);
    }
}