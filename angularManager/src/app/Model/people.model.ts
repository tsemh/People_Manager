import { AddressModel } from "./address.model";

export class PeopleModel {
  public id: number = 0;
  public name: string = '';
  public gender: string = '';
  public birthDate: string = '';
  public maritalStatus: string = '';
  public addresses: AddressModel[] = [];
}
