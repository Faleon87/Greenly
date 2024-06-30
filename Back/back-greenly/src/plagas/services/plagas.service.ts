import { Injectable, NotFoundException } from '@nestjs/common';
import { Plagas } from '../entities/plagas';
import { Repository } from 'typeorm';

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

}
