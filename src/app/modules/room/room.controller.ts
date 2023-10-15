import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RoomService } from './room.service';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await RoomService.createRoom(payload);
  sendResponse<Room>(res, {
    data: result,
    statusCode: httpStatus.CREATED,
    message: 'Room created Successfully',
  });
});
export const RoomController = { createRoom };
