import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateFertilizanteDto {
  @IsString()
  @IsOptional()
  nombreFertilizante: string;

  @IsString()
  @IsOptional()
  tipoFertilizante: string;

  @IsString()
  @IsOptional()
  img: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  elaboracion?: string;

  @IsString()
  @IsOptional()
  ubicacion?: string;

  @IsString()
  @IsOptional()
  cantidad?: string;
}