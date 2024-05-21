import {IsNotEmpty, IsString } from "class-validator";
import { ManyToOne } from "typeorm";
import { User } from "../../usuario/entities/user";

export class CreatePregunta {
    
    @IsString()
    pregunta: string;
  
    @IsString()
    descripcion: string;
  
    @IsNotEmpty()
    @ManyToOne(() => User, user => user.idUser)
    idUsuario: number;
   
    @IsString()
    nombreCultivo: string;
 
}
