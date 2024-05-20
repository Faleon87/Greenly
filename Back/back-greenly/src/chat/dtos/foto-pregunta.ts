import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../../usuario/entities/user";

export class FotoPregunta {
    @IsString()
    @IsNotEmpty()
    nombreFoto: string;
  
    @IsNotEmpty()
    idUsuario: User;
    
}
