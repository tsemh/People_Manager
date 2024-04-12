import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleDTO } from '../DTO/people.dto';
import { PeopleEntity } from '../Entity/people.entity';
import { AddressRepository } from './address.repositry';
import { AddressDTO } from 'src/DTO/address.dto';

@Injectable()
export class PeopleRepository {
  private readonly logger = new Logger(PeopleRepository.name);

  constructor(
    @InjectRepository(PeopleEntity)
    private readonly repository: Repository<PeopleEntity>,

  ) { }

  async save(newPeople: PeopleDTO): Promise<PeopleEntity> {
    try {
      const { id, addresses, ...peopleData } = newPeople;
  
      const addressesWithoutIds = addresses.map(address => {
        const { id: addressId, ...addressData } = address;
        return addressData;
      });
  
      const peopleEntity = this.repository.create({
        ...peopleData,
        addresses: addressesWithoutIds,
      });
  
      const savedPeople = await this.repository.save(peopleEntity);
      return savedPeople;
    } catch (error) {
      this.logger.error(`Failed to save people: ${error.message}`);
      throw new Error('Failed to save people.');
    }
  }
  
  async findAll(page: number = 1, limit: number = 10): Promise<PeopleEntity[]> {
    try {
      const skip = (page - 1) * limit;
      return await this.repository.find({
        relations: ['addresses'],
        skip: skip,
        take: limit,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch people: ${error.message}`);
      throw new Error('Failed to fetch people.');
    }
  }

  async findById(id: number): Promise<PeopleEntity> {
    try {
      const existingPeople = await this.repository.findOne({ where: { id }, relations: ['addresses'] });
      if (!existingPeople) {
        throw new NotFoundException(`People with ID ${id} not found.`);
      }
      return existingPeople;
    } catch (error) {
      this.logger.error(`Failed to fetch people by ID: ${error.message}`);
      throw new NotFoundException('Failed to fetch people by ID.');
    }
  }

  async search(query: string | number, page: number = 1, limit: number = 10): Promise<PeopleEntity[]> {
    try {
      const skip = (page - 1) * limit;
      return await this.repository.createQueryBuilder('people')
        .leftJoinAndSelect('people.addresses', 'address')
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
    } catch (error) {
      this.logger.error(`Failed to search people: ${error.message}`);
      throw new Error('Failed to search people.');
    }
  }

  async update(id: number, updatedPeople: PeopleDTO): Promise<PeopleEntity> {
    try {
      const existingPeople = await this.repository.findOne({ where: { id } });
      if (!existingPeople) {
        throw new NotFoundException(`People with ID ${id} not found.`);
      }

      const existingAddress = existingPeople.addresses;
      this.repository.merge(existingPeople, updatedPeople);
      existingPeople.addresses = existingAddress;
      return await this.repository.save(existingPeople);
    } catch (error) {
      this.logger.error(`Failed to update people: ${error.message}`);
      throw new Error('Failed to update people.');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`People with ID ${id} not found.`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete people: ${error.message}`);
      throw new Error('Failed to delete people.');
    }
  }
}
