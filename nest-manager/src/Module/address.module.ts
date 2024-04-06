import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from 'src/Controller/address.controller';
import { AddressEntity } from 'src/Entity/address.entity';
import { AddressRepository } from 'src/Repository/address.repositry';
import { AddressService } from 'src/Service/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [
   AddressController
  ],
  providers: [
    AddressService,
    AddressRepository
  ],
  exports: [
    AddressRepository,
    AddressService
  ]

})export class AddressModule {}
