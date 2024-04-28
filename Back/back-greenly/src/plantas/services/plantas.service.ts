import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plantas } from '../entities/plantas';

@Injectable()
export class PlantasService {
    constructor(
        @InjectRepository(Plantas)
        private plantasRepository: Repository<Plantas>,
    ) {}

    findAll(): Promise<Plantas[]> {
        return this.plantasRepository.find();
    }
    
    findOne(idPlanta: number): Promise<Plantas> {
        return this.plantasRepository.findOne({ where: { idPlanta } });
    }

    


    

}
