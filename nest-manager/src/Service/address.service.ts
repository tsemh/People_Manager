import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressDTO } from '../DTO/address.dto';
import { AddressEntity } from '../Entity/address.entity';
import { AddressRepository } from 'src/Repository/address.repositry';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async saveAddress(newAddress: AddressDTO): Promise<AddressEntity> {
    return await this.addressRepository.save(newAddress);
  }

  async updateAddress(id: number, updatedAddress: AddressDTO): Promise<AddressEntity> {
    const existingAddress = await this.addressRepository.findById(id);
    if (!existingAddress) {
      throw new NotFoundException(`Address with ID ${id} not found.`);
    }

    return await this.addressRepository.update(id, updatedAddress);
  }

  async getAllAddresses(): Promise<AddressEntity[]> {
    return await this.addressRepository.findAll();
  }

  async getAddressById(id: number): Promise<AddressEntity> {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found.`);
    }
    return address;
  }

  async deleteAddress(id: number): Promise<void> {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found.`);
    }
    await this.addressRepository.delete(id);
  }
}
