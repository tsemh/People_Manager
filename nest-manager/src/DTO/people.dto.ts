import { IsNotEmpty, Length, IsString, ArrayMinSize, ValidateNested} from "class-validator";
import { Type } from "class-transformer";
import { AddressDTO } from "./address.dto";

export class PeopleDTO {

  readonly id: number;

  @IsNotEmpty()
  @IsString({message: "Name must be a string!"})
  @Length(3, 100)
  readonly name: string;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @Length(3, 100)
  readonly gender: string;

  @IsNotEmpty()
  readonly birthDate: string;

  @IsNotEmpty()
  @IsString({message: "Name must be a string!"})
  @Length(3,100)
  readonly maritalStatus: string

  @IsNotEmpty()
  @Type(() => AddressDTO)
  @ArrayMinSize(1, { message: 'Address must not be empty' })
  @ValidateNested({ each: true })
  readonly address: AddressDTO[];
}
