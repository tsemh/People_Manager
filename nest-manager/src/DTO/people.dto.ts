import { IsNotEmpty, Length, IsString, ValidateNested, IsDate, MaxDate} from "class-validator";
import { Type } from "class-transformer";
import { AddressDTO } from "./address.dto";
import { StringToDate } from "src/Util/Decorator/StringToDate.decorator";

export class PeopleDTO {

  readonly id?: number;

  @IsNotEmpty()
  @IsString({message: "Name must be a string!"})
  @Length(3, 100)
  readonly name: string;

  @IsNotEmpty()
  @IsString({message: 'Name must be a string!'})
  @Length(3, 100)
  readonly gender: string;

  @IsNotEmpty()
  @IsDate()
  @StringToDate()
  @MaxDate(new Date(), {
    message: 'The birthDate must be before or equal to today\'s date.'
  })    
  readonly birthDate: Date;


  @IsNotEmpty()
  @IsString({message: "Name must be a string!"})
  @Length(3,100)
  readonly maritalStatus: string

  @Type(() => AddressDTO)
  @ValidateNested({ each: true })
  readonly addresses: AddressDTO[];
}
