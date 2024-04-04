import { IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class AddressDTO {

  readonly id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Length(8, 8)
  readonly cep: number;
  
  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @Length(5, 100)  
  readonly address: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Length(1, 5)
  readonly number: number;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @Length(10, 100) 
  readonly complement: string;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @Length(10, 100) 
  readonly neighborhood: string;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @Length(5, 30) 
  readonly state: string;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @Length(5, 100) 
  readonly city: string

}