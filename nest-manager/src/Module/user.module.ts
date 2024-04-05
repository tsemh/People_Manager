import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/Controller/user.controller';
import { UserEntity } from 'src/Entity/user.entity';
import { UserService } from 'src/Service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [
    UserController
  ],
  providers: [
    UserService
  ]
})
export class UserModule {}
