import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePlantasDto {
  @IsOptional()
  @IsNotEmpty()
  nombrePlanta?: string;

  @IsOptional()
  @IsNotEmpty()
  nombreCientifico?: string;

  @IsOptional()
  @IsNotEmpty()
  identificacion?: string;

  @IsOptional()
  @IsNotEmpty()
  img?: string;
}