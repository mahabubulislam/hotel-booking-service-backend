import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { FacilityRoutes } from '../modules/facility/facility.route';
import { RoomRoutes } from '../modules/room/room.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/room',
    route: RoomRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
