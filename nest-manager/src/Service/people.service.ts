import { Injectable, NotFoundException } from '@nestjs/common';
import { PeopleDTO } from '../DTO/people.dto';
import { PeopleEntity } from '../Entity/people.entity';
import { PeopleRepository } from '../Repository/people.repository';
import { AddressService } from './address.service';

@Injectable()
export class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly addressService: AddressService
  ) {}

  async savePeople(newPeople: PeopleDTO): Promise<PeopleEntity> {
    return await this.peopleRepository.save(newPeople);
  }

  async findAllPeople(): Promise<PeopleEntity[]> {
    return await this.peopleRepository.findAll();
  }

  async findPeopleById(id: number): Promise<PeopleEntity> {
    const existingPeople = await this.peopleRepository.findById(id);
    if (!existingPeople) {
      throw new NotFoundException(`People with ID ${id} not found.`);
    }
    return existingPeople;
  }

  async searchPeople(query: string | number): Promise<PeopleEntity[]> {
    return await this.peopleRepository.search(query);
  }

  async updatePeople(id: number, updatedPeople: PeopleDTO): Promise<PeopleEntity> {
    return await this.peopleRepository.update(id, updatedPeople);
  }

  async deletePeople(id: number): Promise<void> {
    await this.addressService.deleteAddressesByPersonId(id);
    await this.peopleRepository.delete(id);
  }
  
}
