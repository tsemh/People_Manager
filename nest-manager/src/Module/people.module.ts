import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from 'src/Entity/people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity])],
  controllers: [],
  providers: []
})
export class PeopleModule {}
