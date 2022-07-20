import { UsersService } from './../shared/users/users.service'
import { Injectable } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async register(registerDto: RegisterDto): Promise<any> {
    return await this.userService.create(registerDto)
  }
}
