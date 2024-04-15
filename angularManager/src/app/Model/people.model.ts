import { AddressModel } from "./address.model";

export interface PeopleModel {
  id: number;
  name: string;
  gender: string;
  birthDate: string;
  maritalStatus: string;
  addresses: AddressModel[];
}
