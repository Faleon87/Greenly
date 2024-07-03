import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendar } from '../entities/calendar'; // Asegúrate de importar tu entidad Calendar
import { CalendarInsertDto } from '../dtos/calendar-insert-dto'; // Importa tu DTO

@Injectable() // Decorador de inyección de dependencias
export class CalendarService {
    constructor(
        @InjectRepository(Calendar) // Inyecta el repositorio de Calendar
        private calendarRepository: Repository<Calendar>, // Inyecta el repositorio de Calendar
    ) { }

    async insertarCalendar(calendarInsertDto: CalendarInsertDto): Promise<Calendar> {

        try {
               // Crear una instancia de la entidad Calendar
               const calendar = new Calendar();
               // Copiar las propiedades de calendarInsertDto a la instancia de la entidad
               Object.assign(calendar, calendarInsertDto);
               // Guardar la entidad en la base de datos
               return this.calendarRepository.save(calendar);
        } catch (error) {
            console.log(error);
            throw error;
        }

     
    }

}