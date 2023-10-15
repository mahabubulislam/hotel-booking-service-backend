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
export const FacilityController = { createFacility };
