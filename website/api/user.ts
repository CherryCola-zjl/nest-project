import { get, post, put, del } from '../utils/request';

export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface ICreateUser {
  username: string;
  password: string;
  email: string;
}

export const userApi = {
  // 获取用户列表
  getUsers: () => get<IUser[]>('/users'),

  // 获取单个用户
  getUser: (id: string) => get<IUser>(`/users/${id}`),

  // 创建用户
  createUser: (data: ICreateUser) => post<IUser>('/users', data),

  // 更新用户
  updateUser: (id: string, data: Partial<IUser>) => put<IUser>(`/users/${id}`, data),

  // 删除用户
  deleteUser: (id: string) => del(`/users/${id}`),
};
