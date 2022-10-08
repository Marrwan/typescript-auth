import { createUserSchema } from './../schema/user';
import express from 'express'
import validateResource from '../middleware/validateResource';
import { createUserHandler } from '../controller/user';

const router = express.Router()

router.post('/users', validateResource(createUserSchema), createUserHandler)

export default router;