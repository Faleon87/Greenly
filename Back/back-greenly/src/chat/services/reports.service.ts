import { Injectable } from '@nestjs/common';
import { Reports } from '../entities/reports';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from '../entities/pregunta';

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
        const pregunta = new Pregunta();
        pregunta.idPregunta = idPregunta;
        report.pregunta = pregunta;
        report.idUser = idUsuario;
        report.createdAt = new Date();
        return this.reportsRepository.save(report);

    }

    async findAll(): Promise<Partial<Reports>[]> {
        const reports = await this.reportsRepository.find({
            relations: ['pregunta'],
            select: {
                idReport: true,
                idUser: true,
                createdAt: true,
                pregunta: {
                    idPregunta: true
                }
            }
        });
    
        // Mapear los resultados para incluir solo los campos necesarios
        return reports.map(report => ({
            idReport: report.idReport,
            idUser: report.idUser,
            createdAt: report.createdAt,
            idPregunta: report.pregunta.idPregunta // Extraer idPregunta directamente
        }));
    }


}
