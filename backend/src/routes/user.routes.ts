import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router: Router = express.Router();
const userController = new UserController();

router.post('/signup', userController.createUser.bind(userController));
export default router;
