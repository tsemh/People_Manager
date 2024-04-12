import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PeopleEntity } from "./people.entity";

@Entity()
export class AddressEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @Column()
  city: string

  @ManyToOne(type => PeopleEntity, person => person.addresses, { onDelete: 'CASCADE', cascade: ["insert"] })
  @JoinColumn({ name: "person_id"})
  person: PeopleEntity;
}