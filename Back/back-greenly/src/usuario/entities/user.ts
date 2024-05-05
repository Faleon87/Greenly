import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  nombre: string;

  @Column()
  username: string;

  @Column( { nullable: true })
  apellido: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  img: string;
}
