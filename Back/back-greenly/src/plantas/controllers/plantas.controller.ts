import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PlantasService } from '../services/plantas.service';
import { Plantas } from '../entities/plantas';
import { UpdatePlantasDto } from '../dtos/planta-dto';

@Controller('plantas')
export class PlantasController {
  constructor(private plantasService: PlantasService) {}

  @Get()
  findAll(): Promise<Plantas[]> {
    return this.plantasService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: UpdatePlantasDto,
  ): Promise<Plantas> {
    return this.plantasService.update(id, updatedData);
  }

  // Aquí puedes agregar más manejadores de ruta según las necesidades de tu aplicación,
  // como manejadores para crear, actualizar y eliminar plantas.
}
