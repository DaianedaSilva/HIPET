import { User } from '../../entities'

export type CreateUserDto = {
  name: string
  email: string
  password: string
  phoneNumber: string
}

export enum CreateUserResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR'
}

export type CreateUserResult = {
  status: CreateUserResultStatusOptions
  user: User
}

export interface CreateUserContract {
  execute: (userDto: CreateUserDto) => Promise<CreateUserResult>
}
