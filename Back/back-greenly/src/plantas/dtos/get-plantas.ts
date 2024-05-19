import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetPlantas {
  @IsNumber()
  readonly idPlanta: number;

  @IsNotEmpty()
  @IsString()
  readonly nombrePlanta: string;

  @IsNotEmpty()
  @IsString()
  readonly img: string;

    @IsNotEmpty()
    @IsString()
    readonly nombreCientifico: string;
}