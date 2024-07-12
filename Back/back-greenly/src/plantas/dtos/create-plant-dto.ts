import { IsOptional, IsString } from "class-validator";

// create-plant.dto.ts
export class CreatePlantDto {

    @IsString()
    @IsOptional()
    nombrePlanta: string;

    @IsString()
    @IsOptional()
    nombreCientifico: string;
    
    @IsString()
    @IsOptional()
    identificacion: string;

    @IsString()
    @IsOptional()
    img: string;
    
    @IsString()
    @IsOptional()
    siembra: string;
    
    @IsString()
    @IsOptional()
    temporadaSiembra: string;
    
    @IsString()
    @IsOptional()
    profundSiembra: string;
    
    @IsString()
    @IsOptional()
    distanciaPlantas: string;
    
    @IsString()
    @IsOptional()
    rotaciones: string;

    @IsString()
    @IsOptional()
    climaTemperatura: string;
    
    @IsString()
    @IsOptional()
    riego: string;
    
    @IsString()
    @IsOptional()
    riegoEstimado: string;
  }