import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createUserDto: CreateUserDto) {
    const { username, email, phone, password: myPlaintextPassword } = createUserDto
    if (!username || !email || !phone || !myPlaintextPassword)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    const user = await this.userModel.findOne({ email }).exec()
    if (user) throw new HttpException('Username/Email/Phone is already being used', HttpStatus.BAD_REQUEST)

    //Hash password with bcrypt
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = await bcrypt.hashSync(myPlaintextPassword, salt)
    return createUserDto
  }

  async findAll() {
    return await new this.userModel({})
  }

  async findOne(id: string) {
    return `This action returns a #${id} user`
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: string) {
    return `This action removes a #${id} user`
  }
}
