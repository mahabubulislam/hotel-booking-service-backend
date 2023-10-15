import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityController } from './facility.controller';
import { FacilityValidation } from './facility.validation';

const router = Router();
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FacilityValidation.createFacility),
  FacilityController.createFacility,
);

export const FacilityRoutes = router;
