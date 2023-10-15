import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { FacilityRoutes } from '../modules/facility/facility.route';
import { RoomRoutes } from '../modules/room/room.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/room',
    route: RoomRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
