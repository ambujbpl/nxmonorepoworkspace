export type CreateUserBody = {
  name: string;
  email: string;
  password: string;
  age?: number;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type ChangePasswordBody = {
  currentPassword: string;
  newPassword: string;
};

export type User = CreateUserBody & {
  isActive?: boolean;
};

export type UserResponse = Omit<User, 'password'> & {
  id?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type ChangePasswordResponse = {
  message: string;
};