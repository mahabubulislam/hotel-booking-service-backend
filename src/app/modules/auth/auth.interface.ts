import { User } from '@prisma/client';

export type IRegistrationResponses = {
  refreshToken: string;
  accessToken: string;
  user: Partial<User>;
};
