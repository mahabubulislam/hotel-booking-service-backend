import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/auth.validation';
import { AdminController } from './admin.controller';

const router = Router();
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AuthValidation.createUser),
  AdminController.createAdmin,
);
router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN), AdminController.getAllAdmin);
router.delete(
  '/delete-user',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteUser,
);

export const AdminRoutes = router;
