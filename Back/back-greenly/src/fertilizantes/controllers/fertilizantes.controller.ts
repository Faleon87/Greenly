import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { FertilizantesService } from '../services/fertilizantes.service';
import { Fertilizantes } from '../entities/fertilizantes';
import { CreateFertilizanteDto } from '../dtos/create-fertilizantes';
import { UpdateFertilizanteDto } from '../dtos/update-fertilizantes';


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
    @Patch(':id')
    async updateFertilizante(
        @Param('id') id: number,
        @Body() updateFertilizanteDto: UpdateFertilizanteDto
    ): Promise<Fertilizantes> {
        console.log('id', id, 'updateFertilizanteDto', updateFertilizanteDto);
        return this.fertilizantesService.update(id, updateFertilizanteDto);
    }

}
