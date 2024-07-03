import {Min, MaxLength, IsDateString } from 'class-validator';


export class CalendarInsertDto {
    
    @Min(1)
    idUsuario: number;

    @IsDateString()
    fecha: Date;
   
    @MaxLength(255)
    tipoAcción: string;

    @Min(1)
    idPlanta: number;

}