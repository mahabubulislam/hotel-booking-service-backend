import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import prisma from '../../../shared/prisma';
const createAdmin = async (
  user: Prisma.UserCreateInput,
): Promise<Partial<User>> => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...userData } = await prisma.user.create({
    data: user,
  });
  return userData;
};
const getAllAdmins = async (): Promise<Partial<User>[]> => {
  const admins = await prisma.user.findMany({
    where: { role: ENUM_USER_ROLE.ADMIN },
    select: {
      email: true,
      first_name: true,
      last_name: true,
      id: true,
      phone_number: true,
      title: true,
      role: true,
    },
  });
  return admins;
};
export const AdminService = { createAdmin, getAllAdmins };
