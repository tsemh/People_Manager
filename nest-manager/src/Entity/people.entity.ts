import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";

@Entity()
export class PeopleEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  birthdate: string;

  @Column()
  maritalStatus: string

  @Column()
  address: AddressEntity[];
}
