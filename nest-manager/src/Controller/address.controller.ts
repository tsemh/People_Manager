import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { AddressDTO } from '../DTO/address.dto';
import { AddressEntity } from '../Entity/address.entity';
import { AddressService } from '../Service/address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAllAddresses(): Promise<AddressEntity[]> {
    return await this.addressService.getAllAddresses();
  }

  @Get(':id')
  async getAddressById(@Param('id') id: number): Promise<AddressEntity> {
    return await this.addressService.getAddressById(id);
  }

  @Post()
  async saveAddress(@Body() newAddress: AddressDTO): Promise<AddressEntity> {
    return await this.addressService.saveAddress(newAddress); 
  }

  @Patch(':id')
  async updateAddress(@Param('id') id: number, @Body() updatedAddress: AddressDTO): Promise<AddressEntity> {
    return await this.addressService.updateAddress(id, updatedAddress);
  }

  @Delete(':id')
  async deleteAddress(@Param('id') id: number): Promise<void> {
    return await this.addressService.deleteAddress(id);
  }
}
