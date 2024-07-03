import { Injectable } from '@nestjs/common';
import { Fertilizantes } from '../entities/fertilizantes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';




@Injectable()
export class FertilizantesService {

    constructor(
        @InjectRepository(Fertilizantes)
        private fertilizantesRepository: Repository<Fertilizantes>
    ) { }

    async findAll(): Promise<Fertilizantes[]> {
        return await this.fertilizantesRepository.find();
    }


   


}
