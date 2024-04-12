import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { AddressDTO } from '../DTO/address.dto';
import { AddressEntity } from '../Entity/address.entity';
import { AddressRepository } from 'src/Repository/address.repositry';

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(private readonly addressRepository: AddressRepository) {}

  async saveAddress(newAddress: AddressDTO, personId: number): Promise<AddressEntity> {
    try {
      return await this.addressRepository.save(newAddress, personId);
    } catch (error) {
      this.logger.error(`Failed to save address: ${error.message}`);
      throw new Error('Failed to save address.');
    }
  }

  async getAllAddresses(): Promise<AddressEntity[]> {
    try {
      return await this.addressRepository.findAll();
    } catch (error) {
      this.logger.error(`Failed to fetch all addresses: ${error.message}`);
      throw new Error('Failed to fetch all addresses.');
    }
  }

  async getAddressById(id: number): Promise<AddressEntity> {
    try {
      const address = await this.addressRepository.findById(id);
      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found.`);
      }
      return address;
    } catch (error) {
      this.logger.error(`Failed to fetch address by ID: ${error.message}`);
      throw new Error('Failed to fetch address by ID.');
    }
  }

  async updateAddress(id: number, updatedAddress: AddressDTO): Promise<AddressEntity> {
    try {
      const existingAddress = await this.addressRepository.findById(id);
      if (!existingAddress) {
        throw new NotFoundException(`Address with ID ${id} not found.`);
      }

      return await this.addressRepository.update(id, updatedAddress);
    } catch (error) {
      this.logger.error(`Failed to update address: ${error.message}`);
      throw new Error('Failed to update address.');
    }
  }

  async deleteAddress(id: number): Promise<void> {
    try {
      const address = await this.addressRepository.findById(id);
      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found.`);
      }
      await this.addressRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete address: ${error.message}`);
      throw new Error('Failed to delete address.');
    }
  }

  async deleteAddressesByPersonId(personId: number): Promise<void> {
    try {
      const addresses = await this.addressRepository.findByPersonId(personId);

      if (!addresses || addresses.length === 0) {
        return;
      }

      for (const address of addresses) {
        await this.addressRepository.delete(address.id);
      }
    } catch (error) {
      this.logger.error(`Failed to delete addresses by person ID: ${error.message}`);
      throw new Error('Failed to delete addresses by person ID.');
    }
  }
}
