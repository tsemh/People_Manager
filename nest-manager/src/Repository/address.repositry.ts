import { PeopleRepository } from 'src/Repository/people.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressDTO } from '../DTO/address.dto';
import { AddressEntity } from '../Entity/address.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class AddressRepository {
  private readonly logger = new Logger(AddressRepository.name);

  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly peopleRepository: PeopleRepository 
  ) {}

  async save(newAddress: AddressDTO, personId: number): Promise<AddressEntity> {

    const { id, ...addressData } = newAddress;

    try {
      const person = await this.peopleRepository.findById(personId);
      if (!person) {
        throw new NotFoundException(`Person with ID ${personId} not found.`);
      }

      const addressEntity = this.addressRepository.create(addressData);

      addressEntity.person = person;

      return await this.addressRepository.save(addressEntity);
    } catch (error) {
      this.logger.error(`Failed to save address: ${error.message}`);
      throw new Error('Failed to save address.');
    }
  }

  async findAll(): Promise<AddressEntity[]> {
    try {
      return await this.addressRepository.find();
    } catch (error) {
      this.logger.error(`Failed to fetch addresses: ${error.message}`);
      throw new Error('Failed to fetch addresses.');
    }
  }

  async findById(id: number): Promise<AddressEntity> {
    try {
      const existingAddress = await this.addressRepository.findOne({ where: { id } });
      if (!existingAddress) {
        throw new NotFoundException(`Address with ID ${id} not found.`);
      }
      return existingAddress;
    } catch (error) {
      this.logger.error(`Failed to fetch address by ID: ${error.message}`);
      throw new NotFoundException('Failed to fetch address by ID.');
    }
  }

  async findByPersonId(personId: number): Promise<AddressEntity[]> {
    try {
      return await this.addressRepository.find({ where: { person: { id: personId } } });
    } catch (error) {
      this.logger.error(`Failed to fetch addresses by person ID: ${error.message}`);
      throw new Error('Failed to fetch addresses by person ID.');
    }
  }

  async update(id: number, updatedAddress: AddressDTO): Promise<AddressEntity> {
    try {
      const existingAddress = await this.addressRepository.findOne({ where: { id } });
      if (!existingAddress) {
        throw new NotFoundException(`Address with ID ${id} not found.`);
      }

      const mutableAddress = { ...updatedAddress };

      delete mutableAddress.person;
      delete mutableAddress.id;

      if (Object.keys(mutableAddress).length === 0) {
        throw new BadRequestException("No address fields provided for update.");
      }

      Object.assign(existingAddress, mutableAddress);

      return await this.addressRepository.save(existingAddress);
    } catch (error) {
      this.logger.error(`Failed to update address: ${error.message}`);
      throw new Error('Failed to update address.');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const result = await this.addressRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Address with ID ${id} not found.`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete address: ${error.message}`);
      throw new Error('Failed to delete address.');
    }
  }
}
