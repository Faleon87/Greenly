import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  nombre: string;

  @Column()
  username: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  img: string;
}
