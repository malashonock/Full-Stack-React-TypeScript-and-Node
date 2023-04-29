import { UserFields, UserDto } from '@shared/types';

import { FetchService, MutationMethod } from 'common/utils';

const registerUser = async (userData: UserFields): Promise<UserDto> => {
  const createdUser = await FetchService.runMutation<UserFields, UserDto>(
    '/users',
    MutationMethod.POST,
    userData,
  );
  return createdUser;
};

const updateUser = async (
  id: string,
  userData: Partial<UserFields>,
): Promise<UserDto> => {
  const updatedUser = await FetchService.runMutation<
    Partial<UserFields>,
    UserDto
  >(`/users/${id}`, MutationMethod.PUT, userData);
  return updatedUser;
};

export const UserService = {
  registerUser,
  updateUser,
};
