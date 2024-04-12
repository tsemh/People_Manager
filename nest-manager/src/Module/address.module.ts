import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from 'src/Controller/address.controller';
import { AddressEntity } from 'src/Entity/address.entity';
import { AddressRepository } from 'src/Repository/address.repositry';
import { AddressService } from 'src/Service/address.service';
import { PeopleModule } from './people.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity]),
    PeopleModule
  ],
  controllers: [
   AddressController
  ],
  providers: [
    AddressService,
    AddressRepository,
    Logger
  ],
  exports: [
    AddressRepository,
    AddressService
  ]

})export class AddressModule {}
