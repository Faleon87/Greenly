import { Controller, Get } from '@nestjs/common';
import { FertilizantesService } from '../services/fertilizantes.service';
import { Fertilizantes } from '../entities/fertilizantes';
import { CreateFertilizanteDto } from '../dtos/create-fertilizantes';


@Controller('fertilizantes')
export class FertilizantesController {

    constructor(
        private fertilizantesService: FertilizantesService
    ) { }

    @Get('cards')
    async findFertilizantes(): Promise<CreateFertilizanteDto[]> {
        const fertilizante = this.fertilizantesService.findAll();
        return (await fertilizante).map(fertilizante => ({
            idFertilizante: fertilizante.idFertilizante,
            nombreFertilizante: fertilizante.nombreFertilizante,
            img: fertilizante.img,
        }));
    }

    



}
