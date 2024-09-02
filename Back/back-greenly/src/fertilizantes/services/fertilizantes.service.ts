import { Injectable, NotFoundException } from '@nestjs/common';
import { Fertilizantes } from '../entities/fertilizantes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFertilizanteDto } from '../dtos/update-fertilizantes';

 


@Injectable()
export class FertilizantesService {

    constructor(
        @InjectRepository(Fertilizantes)
        private fertilizantesRepository: Repository<Fertilizantes>
    ) { }

    async findAll(): Promise<Fertilizantes[]> {
        return await this.fertilizantesRepository.find();
    }

    async update(id: number, updateFertilizanteDto: UpdateFertilizanteDto): Promise<Fertilizantes> {
        const fertilizante = await this.fertilizantesRepository.findOne({ where: { idFertilizante: id } });
        if (!fertilizante) {
            throw new NotFoundException(`Fertilizante con id ${id} no encontrado`);
        }

        this.fertilizantesRepository.merge(fertilizante, updateFertilizanteDto);
        return await this.fertilizantesRepository.save(fertilizante);
    }


    async create(createFertilizanteData: any): Promise<Fertilizantes> {
        const newFertilizer = this.fertilizantesRepository.create(createFertilizanteData);
        const savedFertilizer = await this.fertilizantesRepository.save(newFertilizer);
        return savedFertilizer[0];
    }

    async delete(id: number): Promise<Fertilizantes> {
        const fertilizante = await this.fertilizantesRepository.findOne({ where: { idFertilizante: id } });
        if (!fertilizante) {
            throw new NotFoundException(`Fertilizante con id ${id} no encontrado`);
        }
        return await this.fertilizantesRepository.remove(fertilizante);
    }

    async findById(idFertilizante: number): Promise<Fertilizantes> {
        const fertilizante = await this.fertilizantesRepository.findOne({ where: { idFertilizante: idFertilizante } });
        if (!fertilizante) {
            throw new NotFoundException(`Fertilizante con id ${idFertilizante} no encontrado`);
        }
        return fertilizante;
    }
}
