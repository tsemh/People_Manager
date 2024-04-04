import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/Entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [],
  providers: []
})export class AddressModule {}
