import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.validation';

const router = Router();
router.post(
  '/create-room',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(RoomValidation.createRoom),
  RoomController.createRoom,
);

export const RoomRoutes = router;
