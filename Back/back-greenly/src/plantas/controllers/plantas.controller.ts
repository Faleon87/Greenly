import { Controller, Get, Param } from '@nestjs/common';
import { PlantasService } from '../services/plantas.service';
import { Plantas } from '../entities/plantas';

@Controller('plantas')
export class PlantasController {
  constructor(private plantasService: PlantasService) {}

  @Get()
  findAll(): Promise<Plantas[]> {
    return this.plantasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Plantas> {
    return this.plantasService.findOne(id);
  }

  // Aquí puedes agregar más manejadores de ruta según las necesidades de tu aplicación,
  // como manejadores para crear, actualizar y eliminar plantas.
}
