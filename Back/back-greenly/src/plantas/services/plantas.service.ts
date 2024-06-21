import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plantas } from '../entities/plantas';
import { UpdatePlantasDto } from '../dtos/update-planta-dto';
import { BenefPerd } from '../../beneficios_per/entities/benef_perd';
@Injectable()
export class PlantasService {
  constructor(
    @InjectRepository(Plantas)
    private plantasRepository: Repository<Plantas>,
    @InjectRepository(BenefPerd)
    private benefPerdRepository: Repository<BenefPerd>,
  ) { }

  findAll(): Promise<Plantas[]> {
    return this.plantasRepository.find();
  }

  async update(id: number, updatePlantasDto: UpdatePlantasDto,): Promise<Plantas> {
    let planta;
    try {
      planta = await this.plantasRepository.findOneOrFail({
        where: { idPlanta: id },
      });
    } catch (error) {
      throw new NotFoundException(`Planta with ID ${id} not found`);
    }

    const updatedPlanta = Object.assign(planta, updatePlantasDto);
    return this.plantasRepository.save(updatedPlanta);
  }

  findOne(id: number): Promise<Plantas> {
    return this.plantasRepository.findOne({ where: { idPlanta: id } });
  }

  async findBeneficiosPerjudiciales(id: number): Promise<BenefPerd[]> {
    return this.benefPerdRepository.find({
      where: { idPlanta: id },
    });
  }


  async getPlantWithState(id: number) {
    const planta = await this.findOne(id);
    const benefPerd = await this.findBeneficiosPerjudiciales(id);

    console.log('benefPerd', benefPerd);
    console.log('planta', planta);
  
    if (!benefPerd.length) {
      console.log('No se encontraron beneficios o perjuicios para la planta con id ' + id);
      return {
        plantaOriginal: this.formatPlantData(planta),
        plantasReferenciadas: [],
      };
    }
  
    const plantasReferenciadas = await Promise.all(benefPerd.map(async (benefPerdItem) => {
      const plantaReferenciada = await this.findOne(benefPerdItem.idBeneficioPerjudicial);
      return {
        ...this.formatPlantData(plantaReferenciada),
        estado: benefPerdItem.boolean ? 'beneficiosa' : 'perjudicial',
      };
    }));
  
    return {
      plantaOriginal: this.formatPlantData(planta),
      plantasReferenciadas,
    };
  }

  private formatPlantData(planta: Plantas) {
     return planta;
  }

}
