import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PlantasService } from '../services/plantas.service';
import { Plantas } from '../entities/plantas';
import { UpdatePlantasDto } from '../dtos/update-planta-dto';
import { GetPlantas } from '../dtos/get-plantas';

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

  @Get('cards')
  async findPlants(): Promise<GetPlantas[]> {
    const plantas = await this.plantasService.findAll();
    return plantas.map(planta => ({
      idPlanta: planta.idPlanta,
      nombrePlanta: planta.nombrePlanta,
      img: planta.img,
      nombreCientifico: planta.nombreCientifico,
    }));
  }
  
  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.plantasService.getPlantWithState(id);
  }
  
}
