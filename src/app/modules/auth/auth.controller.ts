import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IRegistrationResponses } from './auth.interface';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const { refreshToken, ...rest } = await AuthService.createUser(payload);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<Partial<IRegistrationResponses>>(res, {
    data: rest,
    statusCode: httpStatus.CREATED,
    message: 'User Registration Successfully',
  });
});
export const AuthController = { createUser };
