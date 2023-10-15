import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = Router();

router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.categoryInput),
    CategoryController.createCategory,
  );
router.route('/').get(CategoryController.getAllCategory);
router.route('/:id').get(CategoryController.getSingleCategory);
router
  .route('/:id')
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.categoryInput),
    CategoryController.updateCategory,
  );
router
  .route('/:id')
  .delete(auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteCategory);
export const CategoryRoutes = router;
