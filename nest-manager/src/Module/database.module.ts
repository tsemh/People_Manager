import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/Entity/address.entity';
import { PeopleEntity } from 'src/Entity/people.entity';
import { UserEntity } from 'src/Entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [PeopleEntity, AddressEntity, UserEntity],
      synchronize: true
    })
  ]
})
export class DatabaseModule {}
