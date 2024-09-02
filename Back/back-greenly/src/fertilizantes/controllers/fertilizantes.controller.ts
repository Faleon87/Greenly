import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
            tipoFertilizante: fertilizante.tipoFertilizante,
            nombreFertilizante: fertilizante.nombreFertilizante,
            img: fertilizante.img,
            descripcion: fertilizante.descripcion,
            elaboracion: fertilizante.elaboracion,
            ubicacion: fertilizante.ubicacion,
            cantidad: fertilizante.cantidad,
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

    @Post('add')
    async addFertilizante(
        @Body() body: Fertilizantes
    ): Promise<Fertilizantes> {
        const { nombreFertilizante, tipoFertilizante, img, descripcion, elaboracion, ubicacion, cantidad } = body;
        
        console.log('body', body);
        
        const newFertilizer = {
            nombreFertilizante,
            tipoFertilizante,
            img,
            descripcion,
            elaboracion,
            ubicacion,
            cantidad,
        };
        return this.fertilizantesService.create(newFertilizer);
    }

    @Delete(':id')
    async deleteFertilizante(
        @Param('id') id: number
    ): Promise<Fertilizantes> {
        return this.fertilizantesService.delete(id);
    }

    @Get('detalle/:id')
    async findFertilizanteById(
        @Param('id') id: number
    ): Promise<Fertilizantes> {
        return this.fertilizantesService.findById(id);
    }



}
