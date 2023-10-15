import { z } from 'zod';

const facilityInput = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
  }),
});

export const FacilityValidation = { facilityInput };
