import { Injectable, NotFoundException } from '@nestjs/common';
import { PeopleDTO } from '../DTO/people.dto';
import { PeopleEntity } from '../Entity/people.entity';
import { PeopleRepository } from '../Repository/people.repository';

@Injectable()
export class PeopleService {
  constructor(private readonly repository: PeopleRepository) {}

  async savePeople(newPeople: PeopleDTO): Promise<PeopleEntity> {
    return await this.repository.save(newPeople);
  }

  async findAllPeople(): Promise<PeopleEntity[]> {
    return await this.repository.findAll();
  }

  async findPeopleById(id: number): Promise<PeopleEntity> {
    const existingPeople = await this.repository.findById(id);
    if (!existingPeople) {
      throw new NotFoundException(`People with ID ${id} not found.`);
    }
    return existingPeople;
  }

  async updatePeople(id: number, updatedPeople: PeopleDTO): Promise<PeopleEntity> {
    return await this.repository.update(id, updatedPeople);
  }

  async deletePeople(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}
