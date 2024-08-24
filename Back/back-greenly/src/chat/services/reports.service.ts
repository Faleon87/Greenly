import { Injectable } from '@nestjs/common';
import { Reports } from '../entities/reports';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Reports)
        private reportsRepository: Repository<Reports>,
    ) { }


    private reports = [];


    async create(idPregunta: number, idUsuario: number): Promise<Reports> {

        console.log('Creando reporte para pregunta', idPregunta, 'por usuario', idUsuario);

        const report = new Reports(); 
        report.idPregunta = idPregunta;
        report.idUser = idUsuario;
        report.createdAt = new Date();
        return this.reportsRepository.save(report);

    }

    async findAll(): Promise<Reports[]> {
        return this.reportsRepository.find();
    }


}
