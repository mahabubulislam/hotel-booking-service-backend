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
  validateRequest(FacilityValidation.facilityInput),
  FacilityController.createFacility,
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FacilityValidation.facilityInput),
  FacilityController.updateFacility,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),

  FacilityController.deleteFacility,
);
router
  .route('/')
  .get(auth(ENUM_USER_ROLE.ADMIN), FacilityController.getAllFacility);
export const FacilityRoutes = router;
