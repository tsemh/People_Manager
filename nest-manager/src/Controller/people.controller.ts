import { Controller, Get, Post, Patch, Delete, Body, Param, Query, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PeopleDTO } from '../DTO/people.dto';
import { PeopleEntity } from '../Entity/people.entity';
import { PeopleService } from '../Service/people.service';

@Controller('people')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async postPeople(@Body() newPeople: PeopleDTO): Promise<PeopleEntity> {
    try {
      return await this.peopleService.savePeople(newPeople); 
    } catch (error) {
      this.logger.error(`Failed to create people: ${error.message}`);
      throw new HttpException('Failed to create people', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllPeople(@Query('page') page?: number, @Query('limit') limit?: number): Promise<PeopleEntity[]> {
    try {
      return await this.peopleService.findAllPeople(page, limit);
    } catch (error) {
      this.logger.error(`Failed to fetch people: ${error.message}`);
      throw new HttpException('Failed to fetch people', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('search')
  async searchPeople(
    @Query('query') query: string | number,
    @Query('page') page?: number,
    @Query('limit') limit?: number): Promise<PeopleEntity[]> {
    try {
      return await this.peopleService.searchPeople(query, page, limit);
    } catch (error) {
      this.logger.error(`Failed to search people: ${error.message}`);
      throw new HttpException('Failed to search people', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getPeopleById(@Param('id') id: number): Promise<PeopleEntity> {
    try {
      return await this.peopleService.findPeopleById(id);
    } catch (error) {
      this.logger.error(`Failed to fetch person by id ${id}: ${error.message}`);
      throw new HttpException('Failed to fetch person', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async updatePeople(@Param('id') id: number, @Body() updatedPeople: PeopleDTO): Promise<PeopleEntity> {
    try {
      return await this.peopleService.updatePeople(id, updatedPeople);
    } catch (error) {
      this.logger.error(`Failed to update person with id ${id}: ${error.message}`);
      throw new HttpException('Failed to update person', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deletePeople(@Param('id') id: number): Promise<void> {
    try {
      await this.peopleService.deletePeople(id);
    } catch (error) {
      this.logger.error(`Failed to delete person with id ${id}: ${error.message}`);
      throw new HttpException('Failed to delete person', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
