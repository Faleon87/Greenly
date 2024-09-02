import { IsString, IsOptional } from 'class-validator';

export class UpdatePlagaDto {
    @IsString()
    @IsOptional()
    nombrePlaga?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    accionesPreventivas?: string;

    @IsString()
    @IsOptional()
    luchaDirecta?: string;

    @IsString()
    @IsOptional()
    img?: string;
}