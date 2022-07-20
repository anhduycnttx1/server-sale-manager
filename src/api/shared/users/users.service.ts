import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto'
import { User as UserModel } from './models/user.model'

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { email, phone, password, firstName, lastName } = createUserDto
    await this.validateCreateUserRequest(createUserDto)
    //hash password
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = await bcrypt.hashSync(password, salt)
    //Create new user in database
    const user = new this.userModel({
      email,
      firstName,
      lastName,
      phoneNumber: phone,
      hash,
    })
    return user.save()
  }

  async findAll() {
    return await this.userModel.find({})
  }

  async findOne(id: string) {
    return await this.userModel.find({ _id: id })
  }

  private async validateCreateUserRequest(createUserDto: CreateUserDto): Promise<void> {
    const user = await this.userModel.findOne({ email: createUserDto.email }).exec()
    if (user) {
      throw new HttpException('This email/phone already exists', HttpStatus.BAD_REQUEST)
    }
  }
}
