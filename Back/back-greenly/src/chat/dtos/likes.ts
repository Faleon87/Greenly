import { IsNumber, IsNotEmpty } from 'class-validator';
import { User } from '../../usuario/entities/user';
import { ManyToOne } from 'typeorm';
import { Pregunta } from '../entities/pregunta';

export class CreateLikesDto {
  @IsNumber()
  @IsNotEmpty()
  likes: number;

  @IsNotEmpty()
  @ManyToOne(() => User, user => user.idUser)
  idUsuario: number;

 @IsNotEmpty()
  @ManyToOne(() => Pregunta, pregunta => pregunta.idPregunta)
  idPregunta: number;


  

}