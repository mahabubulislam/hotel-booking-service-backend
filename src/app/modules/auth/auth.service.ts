import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { IRegistrationResponses } from './auth.interface';
const createUser = async (user: User): Promise<IRegistrationResponses> => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...rest } = await prisma.user.create({
    data: user,
  });
  const accessToken = jwtHelpers.createToken(
    { id: user.id },
    config.jwt.secret,
    config.jwt.expires_in,
  );
  const refreshToken = jwtHelpers.createToken(
    { id: user.id, role: user.role },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in,
  );
  return { accessToken, refreshToken, user: rest };
};
export const AuthService = { createUser };
