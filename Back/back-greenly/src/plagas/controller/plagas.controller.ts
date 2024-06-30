import { Controller, Get, Param } from '@nestjs/common';
import { PlagasService } from '../services/plagas.service';
import { PlagasDto } from '../dtos/plagas-dto';
import { PlagasDtoDetail } from '../dtos/plagas-dto-detail'; // Import the missing module here

@Controller('plagas')
export class PlagasController {
    constructor(private readonly plagasService: PlagasService, private readonly plagasDto: PlagasDtoDetail) { }

    @Get('cards')
    async getAll(): Promise<PlagasDto[]> {
        const plagas = await this.plagasService.findAll();
        return plagas.map(plaga => ({
            idPlaga: plaga.idPlaga,
            img: plaga.img,
            nombrePlaga: plaga.nombrePlaga,
        }));
    }

    @Get(':idPlaga')
    async getById(@Param('idPlaga') idPlanta: string): Promise<PlagasDtoDetail> {
        const detallePlaga = await this.plagasService.findById(idPlanta);
        return {
            nombrePlaga: detallePlaga.nombrePlaga,
            descripcion: detallePlaga.descripcion,
            accionesPreventivas: detallePlaga.accionesPreventivas,
            luchaDirecta: detallePlaga.luchaDirecta,
            img: detallePlaga.img,
        };
    }

}
