import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, MaxLength, MinLength } from "class-validator";

export class AddressDTO {

  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  @MinLength(8)
  readonly cep: string;
  
  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @MaxLength(100)
  @MinLength(5)
  readonly address: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly number: number;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @MaxLength(100)
  @MinLength(5)
  readonly complement: string;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @MaxLength(100)
  @MinLength(10)
  readonly neighborhood: string;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @MaxLength(30)
  @MinLength(5)
  readonly state: string;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @MaxLength(100)
  @MinLength(5)
  readonly city: string

}