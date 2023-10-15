import { Facility } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FacilityService } from './facility.service';

const createFacility = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await FacilityService.createFacility(payload);
  sendResponse<Facility>(res, {
    data: result,
    statusCode: httpStatus.CREATED,
    message: 'Facility created Successfully',
  });
});

const getAllFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityService.getAllFacility();
  sendResponse<Facility[]>(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Facility fetched Successfully',
  });
});
const updateFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await FacilityService.updateFacility(id, payload);
  sendResponse<Facility>(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Facility Updated Successfully',
  });
});
const deleteFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacilityService.deleteFacility(id);
  sendResponse<Facility>(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Facility deleted Successfully',
  });
});
export const FacilityController = {
  createFacility,
  getAllFacility,
  updateFacility,
  deleteFacility,
};
