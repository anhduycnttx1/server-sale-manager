import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'
export class RegisterDto {
  username: string

  @IsEmail()
  email: string

  @IsPhoneNumber()
  phone: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string
}
