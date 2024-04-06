import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
  birthDate: Date;

  @Column()
  maritalStatus: string

  @OneToMany(type => AddressEntity, address => address.person)
  address: AddressEntity[];
}