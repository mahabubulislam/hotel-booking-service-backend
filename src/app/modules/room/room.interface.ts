import { Facility, Room } from '@prisma/client';

export type IRoomFilters = {
  searchTerm?: string;
};
export type IUpdateRoom = {
  facilities: Facility[];
  room: Partial<Room>;
};
