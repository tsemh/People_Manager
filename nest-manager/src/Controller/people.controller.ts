import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { PeopleDTO } from '../DTO/people.dto';
import { PeopleEntity } from '../Entity/people.entity';
import { PeopleService } from '../Service/people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  async postPeople(@Body() newPeople: PeopleDTO): Promise<PeopleEntity> {
    return await this.peopleService.savePeople(newPeople); 
  }

  @Get()
  async getAllPeople(): Promise<PeopleEntity[]> {
    return await this.peopleService.findAllPeople();
  }

  @Get('search')
  async searchPeople(@Query('query') query: string | number): Promise<PeopleEntity[]> {
    return await this.peopleService.searchPeople(query);
  }

  @Get(':id')
  async getPeopleById(@Param('id') id: number): Promise<PeopleEntity> {
    return await this.peopleService.findPeopleById(id);
  }

  @Patch(':id')
  async updatePeople(@Param('id') id: number, @Body() updatedPeople: PeopleDTO): Promise<PeopleEntity> {
    return await this.peopleService.updatePeople(id, updatedPeople);
  }

  @Delete(':id')
  async deletePeople(@Param('id') id: number): Promise<void> {
    return await this.peopleService.deletePeople(id);
  }
}
