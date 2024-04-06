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

  async findAll(page: number = 1, limit: number = 10): Promise<PeopleEntity[]> {
    const skip = (page - 1) * limit;
    return this.repository.find({
      relations: ['address'],
      skip: skip,
      take: limit,
    });
  }

  async findById(id: number): Promise<PeopleEntity> {
    const existingPeople = await this.repository.findOne({ where: { id }, relations: ['address'] });
    if (!existingPeople) {
      throw new NotFoundException(`People with ID ${id} not found.`);
    }
    return existingPeople;
  }

  async search(query: string | number, page: number = 1, limit: number = 10): Promise<PeopleEntity[]> {
    const skip = (page - 1) * limit;
    return await this.repository.createQueryBuilder('people')
      .leftJoinAndSelect('people.address', 'address')
      .where('people.name LIKE :query', { query: `%${query}%` })
      .orWhere('people.gender LIKE :query', { query: `%${query}%` })
      .orWhere('people.birthDate LIKE :query', { query: `%${query}%` })
      .orWhere('people.maritalStatus LIKE :query', { query: `%${query}%` })
      .orWhere('address.cep LIKE :query', { query: `%${query}%` })
      .orWhere('address.address LIKE :query', { query: `%${query}%` })
      .orWhere('address.number LIKE :query', { query: `%${query}%` })
      .orWhere('address.complement LIKE :query', { query: `%${query}%` })
      .orWhere('address.neighborhood LIKE :query', { query: `%${query}%` })
      .orWhere('address.state LIKE :query', { query: `%${query}%` })
      .orWhere('address.city LIKE :query', { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .getMany();
  }

  async update(id: number, updatedPeople: PeopleDTO): Promise<PeopleEntity> {
    const existingPeople = await this.repository.findOne({ where: { id } });
    if (!existingPeople) {
      throw new NotFoundException(`People with ID ${id} not found.`);
    }

    const existingAddress = existingPeople.address;
    this.repository.merge(existingPeople, updatedPeople);
    existingPeople.address = existingAddress;
    return this.repository.save(existingPeople);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`People with ID ${id} not found.`);
    }
  }
}
