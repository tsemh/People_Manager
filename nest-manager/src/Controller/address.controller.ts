import { Controller, Get, Post, Patch, Delete, Body, Param, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AddressDTO } from '../DTO/address.dto';
import { AddressEntity } from '../Entity/address.entity';
import { AddressService } from '../Service/address.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService, private readonly logger: Logger) {}

  @Get()
  async getAllAddresses(): Promise<AddressEntity[]> {
    try {
      const addresses = await this.addressService.getAllAddresses();
      return addresses;
    } catch (error) {
      this.logger.error(`Error retrieving all addresses: ${error.message}`);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getAddressById(@Param('id') id: number): Promise<AddressEntity> {
    try {
      const address = await this.addressService.getAddressById(id);
      return address;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
      this.logger.error(`Error retrieving address by id ${id}: ${error.message}`);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':personId')
  async saveAddress(@Body() newAddress: AddressDTO, @Param('personId') personId: number): Promise<AddressEntity> {
    try {
      const savedAddress = await this.addressService.saveAddress(newAddress, personId);
      return savedAddress;
    } catch (error) {
      if (error.response && error.response.statusCode === 400) {
        throw error;
      }
      this.logger.error(`Error saving address: ${error.message}`);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async updateAddress(@Param('id') id: number, @Body() updatedAddress: AddressDTO): Promise<AddressEntity> {
    try {
      const updated = await this.addressService.updateAddress(id, updatedAddress);
      return updated;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
      this.logger.error(`Error updating address with id ${id}: ${error.message}`);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteAddress(@Param('id') id: number): Promise<void> {
    try {
      await this.addressService.deleteAddress(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      }
      this.logger.error(`Error deleting address with id ${id}: ${error.message}`);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
