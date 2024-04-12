import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PeopleDTO } from '../DTO/people.dto';
import { PeopleEntity } from '../Entity/people.entity';
import { PeopleRepository } from '../Repository/people.repository';

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name);

  constructor(
    private readonly peopleRepository: PeopleRepository,
  ) {}

  async savePeople(newPeople: PeopleDTO): Promise<PeopleEntity> {
    try {
      return await this.peopleRepository.save(newPeople);
    } catch (error) {
      this.logger.error(`Failed to save people: ${error.message}`);
      throw new Error('Failed to save people.');
    }
  }

  async findAllPeople(page?: number, limit?: number): Promise<PeopleEntity[]> {
    try {
      if (page !== undefined && limit !== undefined) {
        return await this.peopleRepository.findAll(page, limit);
      } else {
        return await this.peopleRepository.findAll();
      }
    } catch (error) {
      this.logger.error(`Failed to fetch all people: ${error.message}`);
      throw new Error('Failed to fetch all people.');
    }
  }

  async findPeopleById(id: number): Promise<PeopleEntity> {
    try {
      const existingPeople = await this.peopleRepository.findById(id);
      if (!existingPeople) {
        throw new NotFoundException(`People with ID ${id} not found.`);
      }
      return existingPeople;
    } catch (error) {
      this.logger.error(`Failed to fetch people by ID: ${error.message}`);
      throw new NotFoundException('Failed to fetch people by ID.');
    }
  }

  async searchPeople(query: string | number, page: number = 1, limit: number = 10): Promise<PeopleEntity[]> {
    try {
      return await this.peopleRepository.search(query, page, limit);
    } catch (error) {
      this.logger.error(`Failed to search people: ${error.message}`);
      throw new Error('Failed to search people.');
    }
  }
  
  async updatePeople(id: number, updatedPeople: PeopleDTO): Promise<PeopleEntity> {
    try {
      return await this.peopleRepository.update(id, updatedPeople);
    } catch (error) {
      this.logger.error(`Failed to update people: ${error.message}`);
      throw new Error('Failed to update people.');
    }
  }

  async deletePeople(id: number): Promise<void> {
    try {
      //await this.addressService.deleteAddressesByPersonId(id);
      await this.peopleRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete people: ${error.message}`);
      throw new Error('Failed to delete people.');
    }
  }
}
