import { Prisma, Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createRoom = async (payload: Prisma.RoomCreateInput): Promise<Room> => {
  const { facilities, ...room } = payload;

  const result = await prisma.room.create({
    data: {
      ...room,
      facilities: {
        connect: facilities as Prisma.FacilityOnRoomWhereUniqueInput[],
      },
    },
  });
  return result;
};

export const RoomService = { createRoom };
