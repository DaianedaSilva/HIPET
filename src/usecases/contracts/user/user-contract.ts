export type CreateUserDto = {
  name: string
  email: string
  password: string
  phoneNumber: string
}

export interface CreateUserContract {
  execute: (userDto: CreateUserDto) => any
}
