import { z } from 'zod';
const facilitySchema = z.object({
  id: z.string({ required_error: 'Facility is required' }),
});
const createRoom = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    price: z.number({ required_error: 'Price is required' }),
    bed: z.number({ required_error: 'Bed is required' }),
    bathroom: z.number({ required_error: 'Bathroom is required' }),
    balcony: z.number({ required_error: 'Balcony is required' }),
    size: z.string({ required_error: 'Room size is required' }),
    images: z.string({ required_error: 'Images is required' }).array(),
    facilities: z.array(facilitySchema),
  }),
});

export const RoomValidation = { createRoom };
