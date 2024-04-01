import { User } from 'src/core/users/entities/user.entity'

export interface AuthResponse {
  user: User
  token: string
}
