import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PlagasDto {

    @IsNumber()
    readonly idPlaga: number;

    @IsNotEmpty()
    @IsString()
    readonly img: string;

    @IsNotEmpty()
    @IsString()
    readonly nombrePlaga: string;
}
