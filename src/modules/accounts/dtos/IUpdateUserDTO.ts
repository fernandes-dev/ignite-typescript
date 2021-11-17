export interface IUpdateUserDTO {
  user_id: string
  name?: string
  email?: string
  password?: string
  driver_license?: string
  avatar?: string
  is_admin?: boolean
}
