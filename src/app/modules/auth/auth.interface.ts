import { User } from '@prisma/client';

export type IRegistrationResponses = {
  refreshToken: string;
  accessToken: string;
  user: Partial<User>;
};
export type ILoginResponses = {
  refreshToken: string;
  accessToken: string;
};

export type ILogin = {
  email: string;
  password: string;
};
