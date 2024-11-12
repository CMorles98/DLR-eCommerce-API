import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UsersService } from '../../core/users/users.service'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userId: string = context.switchToHttp().getRequest().user.id
    const { role } = await this.userService.findOne({ _id: userId })
    const isAdmin = role.some((role) => role === 'admin')
    return isAdmin
  }
}
