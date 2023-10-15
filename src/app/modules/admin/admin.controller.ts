import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AdminService.createAdmin(payload);

  sendResponse<Partial<User>>(res, {
    data: result,
    statusCode: httpStatus.CREATED,
    message: 'Admin created Successfully',
  });
});
const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllAdmins();

  sendResponse<Partial<User>[]>(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Admin created Successfully',
  });
});

export const AdminController = { createAdmin, getAllAdmin };
