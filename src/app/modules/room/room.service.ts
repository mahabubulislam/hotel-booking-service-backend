import { Prisma, Room } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { roomSearchableFields } from './room.constant';
import { IRoomFilters, IUpdateRoom } from './room.interface';

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

const updateRoom = async (roomId: string, payload: IUpdateRoom) => {
  const { facilities, ...roomData } = payload;
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      facilities: true,
    },
  });

  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }

  const existingFacilityIds = room.facilities.map(facility => facility.id);
  const facilityIds = facilities.map(facility => facility.id);
  // Calculate facilities to add and remove
  const facilitiesToAdd = facilityIds.filter(
    id => !existingFacilityIds.includes(id),
  );
  const facilitiesToRemove = existingFacilityIds.filter(
    id => !facilityIds.includes(id),
  );

  const updatePromises = [];

  if (facilitiesToAdd.length > 0) {
    updatePromises.push(
      prisma.room.update({
        where: { id: roomId },
        data: {
          ...roomData,
          facilities: {
            connect: facilitiesToAdd.map(facilityId => ({ id: facilityId })),
          },
        },
        include: { facilities: true, category: true },
      }),
    );
  }

  if (facilitiesToRemove.length > 0) {
    updatePromises.push(
      prisma.room.update({
        where: { id: roomId },
        data: {
          ...roomData,
          facilities: {
            disconnect: facilitiesToRemove.map(facilityId => ({
              id: facilityId,
            })),
          },
        },
        include: { facilities: true, category: true },
      }),
    );
  }
  if (!facilitiesToAdd.length && !facilitiesToRemove.length) {
    updatePromises.push(
      prisma.room.update({
        where: { id: roomId },
        data: roomData as Partial<Room>,

        include: { facilities: true, category: true },
      }),
    );
  }

  const data = await Promise.all(updatePromises);

  return data[0];
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

const getSingleRoom = async (id: string): Promise<Room | null> => {
  const room = await prisma.room.findUniqueOrThrow({
    where: { id },
    include: { category: true, facilities: true },
  });
  return room;
};

const deleteRoom = async (id: string): Promise<Room | null> => {
  const room = await prisma.room.delete({
    where: { id },
    include: { category: true, facilities: true },
  });
  return room;
};
export const RoomService = {
  createRoom,
  getAllRoom,
  updateRoom,
  getSingleRoom,
  deleteRoom,
};
