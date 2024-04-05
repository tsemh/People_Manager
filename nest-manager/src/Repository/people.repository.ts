import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleDTO } from '../DTO/people.dto';
import { PeopleEntity } from '../Entity/people.entity';
import { AddressRepository } from './address.repositry';

@Injectable()
export class PeopleRepository {
  constructor(
    @InjectRepository(PeopleEntity)
    private readonly repository: Repository<PeopleEntity>,

    private readonly addressRepository: AddressRepository
  ) { }

  async save(newPeople: PeopleDTO): Promise<PeopleEntity> {
    const peopleEntity = this.repository.create(newPeople);
    
    if (newPeople.address) {
      const addressEntities = await Promise.all(newPeople.address.map(async addr => {
        const createdAddress = await this.addressRepository.save(addr);
        return createdAddress;
      }));
      peopleEntity.address = addressEntities;
    }
  
    return this.repository.save(peopleEntity);
  }
  
  async update(id: number, updatedPeople: PeopleDTO): Promise<PeopleEntity> {
    const existingPeople = await this.repository.findOne({ where: { id } });
    if (!existingPeople) {
      throw new NotFoundException(`People with ID ${id} not found.`);
    }

    this.repository.merge(existingPeople, updatedPeople);
    return this.repository.save(existingPeople);
  }

  async findAll(): Promise<PeopleEntity[]> {
    return this.repository.find({ relations: ['address'] });
  }

  async findById(id: number): Promise<PeopleEntity> {
    const existingPeople = await this.repository.findOne({ where: { id }, relations: ['address'] });
    if (!existingPeople) {
      throw new NotFoundException(`People with ID ${id} not found.`);
    }
    return existingPeople;
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`People with ID ${id} not found.`);
    }
  }
}
