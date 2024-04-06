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
    private readonly repository: Repository<AddressEntity>,
  ) {}

  async save(newAddress: AddressDTO): Promise<AddressEntity> {
    try {
      const addressEntity = this.repository.create(newAddress);
      return await this.repository.save(addressEntity);
    } catch (error) {
      this.logger.error(`Failed to save address: ${error.message}`);
      throw new Error('Failed to save address.');
    }
  }

  async findAll(): Promise<AddressEntity[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      this.logger.error(`Failed to fetch addresses: ${error.message}`);
      throw new Error('Failed to fetch addresses.');
    }
  }

  async findById(id: number): Promise<AddressEntity> {
    try {
      const existingAddress = await this.repository.findOne({ where: { id } });
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
      return await this.repository.find({ where: { person: { id: personId } } });
    } catch (error) {
      this.logger.error(`Failed to fetch addresses by person ID: ${error.message}`);
      throw new Error('Failed to fetch addresses by person ID.');
    }
  }

  async update(id: number, updatedAddress: AddressDTO): Promise<AddressEntity> {
    try {
      const existingAddress = await this.repository.findOne({ where: { id } });
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

      return await this.repository.save(existingAddress);
    } catch (error) {
      this.logger.error(`Failed to update address: ${error.message}`);
      throw new Error('Failed to update address.');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Address with ID ${id} not found.`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete address: ${error.message}`);
      throw new Error('Failed to delete address.');
    }
  }
}
