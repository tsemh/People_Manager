import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressDTO } from '../DTO/address.dto';
import { AddressEntity } from '../Entity/address.entity';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repository: Repository<AddressEntity>,
  ) {}

  async save(newAddress: AddressDTO): Promise<AddressEntity> {
    const addressEntity = this.repository.create(newAddress);
    return this.repository.save(addressEntity);
  }

  async update(id: number, updatedAddress: AddressDTO): Promise<AddressEntity> {
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
  
    return this.repository.save(existingAddress);
  }
  
  
  async findAll(): Promise<AddressEntity[]> {
    return this.repository.find();
  }
  
  async findById(id: number): Promise<AddressEntity> {
    const existingAddress = await this.repository.findOne({ where: { id } });
    if (!existingAddress) {
      throw new NotFoundException(`Address with ID ${id} not found.`);
    }
    return existingAddress;
  }

    async findByPersonId(personId: number): Promise<AddressEntity[]> {
    return this.repository.find({ where: { person: { id: personId } } });
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Address with ID ${id} not found.`);
    }
  }
}
