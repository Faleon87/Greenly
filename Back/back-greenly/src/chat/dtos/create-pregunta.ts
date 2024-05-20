import { IsDate,  IsNumber, IsString } from "class-validator";

export class CreatePregunta {

  
    @IsString()
    pregunta: string;
  
    @IsString()
    descripcion: string;
  
    @IsNumber()
    idUsuario: number;
  
   
    @IsString()
    nombreCultivo: string;
 
}
