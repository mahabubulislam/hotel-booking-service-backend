import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomFilterableFields } from './room.constant';
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
const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await RoomService.updateRoom(id, payload);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.CREATED,
    message: 'Room updated Successfully',
  });
});
const getAllRoom = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const { data, meta } = await RoomService.getAllRoom(filters, options);
  sendResponse(res, {
    data: data,
    meta: meta,
    statusCode: httpStatus.CREATED,
    message: 'Room fetched Successfully',
  });
});
const getSingleRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomService.getSingleRoom(id);
  sendResponse<Room>(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Room fetched Successfully',
  });
});
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomService.deleteRoom(id);
  sendResponse<Room>(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Room deleted Successfully',
  });
});
export const RoomController = {
  createRoom,
  getAllRoom,
  updateRoom,
  getSingleRoom,
  deleteRoom,
};
