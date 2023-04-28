export interface UserDto {
  id: string;
  userName: string;
  email: string;
  // password: string; // not included
  isConfirmed: boolean;
  isDisabled: boolean;
  createdOn: string; // date string
  lastModifiedOn: string; // date string
}

export type AuthDto = Pick<UserDto, 'id' | 'userName'>;
