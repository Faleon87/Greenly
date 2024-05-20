import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pregunta } from '../../chat/entities/pregunta';

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

  @OneToMany(() => Pregunta, pregunta => pregunta.idUsuario)
  preguntas: Pregunta[];
}
