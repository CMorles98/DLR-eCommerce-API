import { Injectable, UnauthorizedException } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/core/users/users.service'
import { AuthResponse } from './interfaces/auth-response'
import { isEmpty } from 'class-validator'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const user = await this.usersService.create(registerDto)
    return this.generateAuthResponse(user)
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findOne({ email: loginDto.email })
    this.validateUser(user, loginDto.password)
    return this.generateAuthResponse(user)
  }

  private validateUser(user: any, password: string): void {
    if (isEmpty(user) || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales inválidas')
    }
  }

  private generateAuthResponse(user: any): AuthResponse {
    const token = this.jwtService.sign({ id: user.id })
    return { user, token }
  }
}
