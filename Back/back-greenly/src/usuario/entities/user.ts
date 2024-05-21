import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pregunta } from '../../chat/entities/pregunta';
import { FotoPreguntas } from '../../chat/entities/foto-preguntas';
import { Likes } from 'src/chat/entities/likes';
import { Respuestas } from 'src/chat/entities/respuestas';

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

  @OneToMany(() => FotoPreguntas, fotoPregunta => fotoPregunta.idUsuario)
  fotosPreguntas: FotoPreguntas[];

  @OneToMany(() => Likes, likes => likes.idUsuario)
  likes: Likes[];

  @OneToMany(() => Respuestas, respuestas => respuestas.idUsuario)
  respuestas: Respuestas[];

}
