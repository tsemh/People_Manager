import { AddressModule } from './address.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from 'src/Controller/people.controller';
import { PeopleEntity } from 'src/Entity/people.entity';
import { PeopleRepository } from 'src/Repository/people.repository';
import { PeopleService } from 'src/Service/people.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PeopleEntity]), 
    AddressModule
],
  controllers: [
    PeopleController
  ],
  providers: [
    PeopleService,
    PeopleRepository
  ],
  exports: [PeopleRepository]
})
export class PeopleModule {}
