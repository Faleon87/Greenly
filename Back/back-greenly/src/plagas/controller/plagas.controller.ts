import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { PlagasService } from '../services/plagas.service';
import { PlagasDto } from '../dtos/plagas-dto';
import { UpdatePlagaDto } from '../dtos/update-plaga-dto';
import { PlagasDtoDetail } from '../dtos/plagas-dto-detail'; // Import the missing module here
import { Plagas } from '../entities/plagas';

@Controller('plagas')
export class PlagasController {
    constructor(private readonly plagasService: PlagasService, private readonly plagasDto: PlagasDtoDetail
    ) { }

    @Get('cards')
    async getAll(): Promise<PlagasDto[]> {
        const plagas = await this.plagasService.findAll();
        return plagas.map(plaga => ({
            idPlaga: plaga.idPlaga,
            img: plaga.img,
            nombrePlaga: plaga.nombrePlaga,
            descripcion: plaga.descripcion,
            accionesPreventivas: plaga.accionesPreventivas,
            luchaDirecta: plaga.luchaDirecta,
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

    @Patch('update/:idPlaga')
    async updatePlaga(
        @Param('idPlaga') idPlaga: string,
        @Body() updatePlagaDto: UpdatePlagaDto,
    ): Promise<PlagasDtoDetail> {
        try {
            const updatedPlaga = await this.plagasService.updatePlaga(idPlaga, updatePlagaDto);
            return {
                nombrePlaga: updatedPlaga.nombrePlaga,
                descripcion: updatedPlaga.descripcion,
                accionesPreventivas: updatedPlaga.accionesPreventivas,
                luchaDirecta: updatedPlaga.luchaDirecta,
                img: updatedPlaga.img,
            };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error al actualizar la plaga', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('add')
    async addPlaga(@Body() plaga: PlagasDtoDetail): Promise<PlagasDtoDetail> {
        try {
            return this.plagasService.addPlaga(plaga);
        } catch (error) {
            console.error(error);
            throw new HttpException('Error al añadir la plaga', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('delete/:idPlaga')
    async deletePlaga(@Param('idPlaga') idPlaga: string): Promise<void> {
        try {
            await this.plagasService.deletePlaga(idPlaga);
        } catch (error) {
            console.error(error);
            throw new HttpException('Error al eliminar la plaga', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
