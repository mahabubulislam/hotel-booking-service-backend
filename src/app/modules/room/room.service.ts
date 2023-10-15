import { Prisma, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { roomSearchableFields } from './room.constant';
import { IRoomFilters } from './room.interface';

const createRoom = async (payload: Prisma.RoomCreateInput): Promise<Room> => {
  const { facilities, ...room } = payload;

  const result = await prisma.room.create({
    data: {
      ...room,
      facilities: {
        connect: facilities as Prisma.FacilityWhereUniqueInput[],
      },
    },

    include: { category: true, facilities: true },
  });
  return result;
};
const getAllRoom = async (
  filters: IRoomFilters,
  options: IPaginationOptions,
): Promise<IGenericResponse<Room[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: roomSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => {
        const fieldMapping: Record<string, unknown> = {};
        if (key === 'category') {
          fieldMapping.categoryId = { contains: value };
        } else if (key === 'minPrice' || key === 'maxPrice') {
          fieldMapping.price =
            key === 'minPrice'
              ? { gte: parseFloat(value as string) }
              : { lte: parseFloat(value as string) };
        } else {
          fieldMapping[key] = { gte: parseFloat(value as string) };
        }
        return fieldMapping;
      }),
    });
  }

  const whereConditions: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const rooms = await prisma.room.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            price: 'desc',
          },
    include: { category: true, facilities: true },
  });
  const total = await prisma.room.count();
  return { data: rooms, meta: { limit, page, total } };
};
export const RoomService = { createRoom, getAllRoom };
