import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegerType, Repository } from 'typeorm';
import { Plantas } from '../entities/plantas';
import { UpdatePlantasDto } from '../dtos/planta-dto';

@Injectable()
export class PlantasService {
  constructor(
    @InjectRepository(Plantas)
    private plantasRepository: Repository<Plantas>,
  ) {}

  findAll(): Promise<Plantas[]> {
    return this.plantasRepository.find();
  }

  async update(id: number, updatePlantasDto: UpdatePlantasDto): Promise<Plantas> {
    let planta;
    try {
      planta = await this.plantasRepository.findOneOrFail({ where: { idPlanta: id } });
    } catch (error) {
      throw new NotFoundException(`Planta with ID ${id} not found`);
    }
    
    const updatedPlanta = Object.assign(planta, updatePlantasDto);
    return this.plantasRepository.save(updatedPlanta);
  }
}
