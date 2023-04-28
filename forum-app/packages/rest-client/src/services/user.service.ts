import { NewUserFields, UpdateUserFields, UserDto } from '@shared/types';

import { FetchService, MutationMethod } from 'common/utils';

const registerUser = async (userData: NewUserFields): Promise<UserDto> => {
  const createdUser = await FetchService.runMutation<NewUserFields, UserDto>(
    '/user',
    MutationMethod.POST,
    userData,
  );
  return createdUser;
};

const updateUser = async (
  id: string,
  userData: UpdateUserFields,
): Promise<UserDto> => {
  const updatedUser = await FetchService.runMutation<UpdateUserFields, UserDto>(
    `/user/${id}`,
    MutationMethod.PUT,
    userData,
  );
  return updatedUser;
};

export const UserService = {
  registerUser,
  updateUser,
};
