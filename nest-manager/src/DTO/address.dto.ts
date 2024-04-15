import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { PeopleDTO } from "./people.dto";
import { Type } from "class-transformer";

export class AddressDTO {

  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(9)
  @MinLength(9)
  readonly cep: string;
  
  @IsNotEmpty()
  @IsString({message: 'Address must be a string!'})
  @MaxLength(100)
  @MinLength(3)
  readonly address: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly number: number;

  @IsNotEmpty()
  @IsString({message: 'Complement must be a string!'})
  @MaxLength(100)
  @MinLength(3)
  readonly complement: string;

  @IsNotEmpty()
  @IsString({message: 'Neighborhood must be a string!'})
  @MaxLength(100)
  @MinLength(3)
  readonly neighborhood: string;

  @IsNotEmpty()
  @IsString({message: 'State must be a string!'})
  @MaxLength(30)
  @MinLength(2)
  readonly state: string;

  @IsNotEmpty()
  @IsString({message: 'City must be a string!'})
  @MaxLength(30)
  @MinLength(3)
  readonly city: string

  @Type(() => PeopleDTO)
  readonly person: PeopleDTO;
}