import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../../usuario/entities/user";
import { ManyToOne } from "typeorm";

export class FotoPregunta {
    @IsString()
    @IsNotEmpty()
    nombreFoto: string;
  
    @IsNotEmpty()
    @ManyToOne(() => User, user => user.idUser)
    idUsuario: number;
    
}
