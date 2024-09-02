import { Injectable, NotFoundException } from '@nestjs/common';
import { Plagas } from '../entities/plagas';
import { Repository } from 'typeorm';
import { PlagasDtoDetail } from '../dtos/plagas-dto-detail';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlagasService {

    constructor(
        @InjectRepository(Plagas)
        private plagasRepository: Repository<Plagas>,
    ) { }


    findAll(): Promise<Plagas[]> {
        return this.plagasRepository.find();
    }


    async findById(id: string): Promise<Plagas> {
        const plaga = await this.plagasRepository.findOne({ where: { idPlaga: Number(id) }  });
        if (!plaga) {
            throw new NotFoundException(`Plaga with ID ${id} not found`);
        }
        return plaga;
    }

    async updatePlaga(id: string, updatePlagaDto: Partial<Plagas>): Promise<Plagas> {
        const plaga = await this.plagasRepository.findOne({ where: { idPlaga: Number(id) } });
        if (!plaga) {
            throw new NotFoundException(`Plaga with ID ${id} not found`);
        }
        Object.assign(plaga, updatePlagaDto);
        return this.plagasRepository.save(plaga);
    }
    
    async addPlaga (plaga: PlagasDtoDetail): Promise<Plagas> {
        return this.plagasRepository.save(plaga);
    }

    async deletePlaga(id: string): Promise<void> {
        const result = await this.plagasRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Plaga with ID ${id} not found`);
        }
    }
   
}
