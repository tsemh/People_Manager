import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { PeopleDTO } from 'src/DTO/people.dto';

@Controller('people')
export class PeopleController {

  @Get()
  getAllPeople() {
    return 'all';
  }

  @Post()
  postPeople(@Body() newPeople: PeopleDTO): PeopleDTO {
    return newPeople;
  }

  @Patch()
  updatePeople() {
    return 'updatePeople'
  }

  @Delete()
  deletePeople() {
    return 'delete people'
  }

}
