import { z } from 'zod';
import { ENUM_USER_ROLE } from '../../../enums/user';
const createUser = z.object({
  body: z.object({
    first_name: z.string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    }),
    last_name: z.string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    }),
    email: z.string().email({ message: 'Invalid Email' }),
    password: z
      .string()
      .min(6, { message: 'Minimum 6 characters required' })
      .max(16, { message: 'Maximum 16 characters are allowed' }),
    phone_number: z
      .string({ required_error: 'Phone number is required' })
      .min(6, { message: 'Phone Number Should at least 6 digit' }),
    role: z.enum([ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER]).optional(),
  }),
});
const loginUser = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid Email' }),
    password: z
      .string()
      .min(6, { message: 'Minimum 6 characters required' })
      .max(16, { message: 'Maximum 16 characters are allowed' }),
  }),
});
export const AuthValidation = { createUser, loginUser };
