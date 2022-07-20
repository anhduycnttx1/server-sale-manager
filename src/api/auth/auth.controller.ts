import { Controller, Post, Body, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { Response } from 'express'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Res() res: Response, @Body() registerDto: RegisterDto): Promise<any> {
    const user = await this.authService.register(registerDto)
    return res.status(201).json({ statusCode: 201, message: `Create successfuly user with id : ${user._id}` })
  }
}
