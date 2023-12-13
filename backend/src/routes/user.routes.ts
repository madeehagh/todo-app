import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router: Router = express.Router();
const userController = new UserController();

//TODO: return jwt token when a user signs up

router.post('/signup', userController.createUser.bind(userController));

//TODO: Add more routes for the user flow

export default router;
