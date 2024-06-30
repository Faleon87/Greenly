import { IsString, IsUrl } from "class-validator";

export class                                                                PlagasDtoDetail {

    @IsString()
    readonly nombrePlaga: string;

    @IsString()
    readonly descripcion: string;

    @IsString()
    readonly accionesPreventivas: string;

    @IsString()
    readonly luchaDirecta: string;

    @IsString()
    @IsUrl()
    readonly img: string;

}
