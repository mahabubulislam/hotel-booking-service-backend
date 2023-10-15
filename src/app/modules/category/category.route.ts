import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { categoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = Router();

router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.categoryInput),
    categoryController.createCategory,
  );
router.route('/').get(categoryController.getAllCategory);
router.route('/:id').get(categoryController.getSingleCategory);
router
  .route('/:id')
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.categoryInput),
    categoryController.updateCategory,
  );
router
  .route('/:id')
  .delete(auth(ENUM_USER_ROLE.ADMIN), categoryController.deleteCategory);
export const categoryRoutes = router;
