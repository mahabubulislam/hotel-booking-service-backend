import { Facility, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFacility = async (
  payload: Prisma.FacilityCreateInput,
): Promise<Facility> => {
  const facility = await prisma.facility.create({
    data: payload,
  });

  return facility;
};

export const FacilityService = { createFacility };
