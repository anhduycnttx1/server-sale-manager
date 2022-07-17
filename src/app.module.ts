import { Module } from '@nestjs/common'
import { UsersModule } from './api/shared/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    // Module database Mongoose
    MongooseModule.forRoot(
      'mongodb+srv://duydo14:LDDXAsSV58BFS6Jm@cluster0.ygwykkt.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
    ),
    // Module Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Module Shared
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
