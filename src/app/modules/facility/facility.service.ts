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
const updateFacility = async (
  id: string,
  payload: Prisma.FacilityUpdateInput,
): Promise<Facility> => {
  const facility = await prisma.facility.update({
    where: { id },
    data: payload,
  });

  return facility;
};
const getAllFacility = async (): Promise<Facility[]> => {
  const result = await prisma.facility.findMany();
  return result;
};
const deleteFacility = async (id: string): Promise<Facility> => {
  const facility = await prisma.facility.delete({
    where: { id },
  });

  return facility;
};
export const FacilityService = {
  createFacility,
  getAllFacility,
  updateFacility,
  deleteFacility,
};
