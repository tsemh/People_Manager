import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AddressEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: number;

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
}