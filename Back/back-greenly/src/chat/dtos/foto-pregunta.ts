import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../../usuario/entities/user";
import { ManyToOne } from "typeorm";
import { Pregunta } from "../entities/pregunta";

export class FotoPregunta {
  @IsString()
  @IsNotEmpty()
  nombreFoto: string;

  @IsNotEmpty()
  @ManyToOne(() => User, user => user.idUser)
  idUsuario: number;

  @IsNotEmpty()
  @ManyToOne(() => Pregunta, pregunta => pregunta.idPregunta)
  idPregunta: number;






}
