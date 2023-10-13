import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();
router.post(
  '/register',
  validateRequest(AuthValidation.createUser),
  AuthController.createUser,
);
export const AuthRoutes = router;
