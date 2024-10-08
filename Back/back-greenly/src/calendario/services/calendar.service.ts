import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
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

    async obtenerPorFechaYUsuario(fecha: string, idUser: string): Promise<Calendar[]> {
        try {
            // Buscar en la base de datos los registros que coincidan con la fecha y el id del usuario
            // e incluir solo los campos específicos de las plantas relacionadas
            return this.calendarRepository.createQueryBuilder('calendar')
                .leftJoin('calendar.idPlanta', 'planta') // Usar leftJoin sin Select
                .addSelect(['planta.idPlanta', 'planta.nombrePlanta', 'planta.img']) // Especificar los campos deseados
                .where('calendar.fecha = :fecha', { fecha })
                .andWhere('calendar.idUsuario = :idUser', { idUser })
                .getMany();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    

    async eliminarPlanta(fecha: Date, idUser: number, planta: number, accionSeleccionada: string): Promise<Calendar> {
        try {
            // Buscar el registro en la base de datos
            const calendar = await this.calendarRepository.findOne({
                where: { fecha, idUsuario: Equal(idUser), idPlanta: Equal(planta), tipoAcción: accionSeleccionada }
            });
            // Si no se encuentra el registro, lanzar un error
            if (!calendar) {
                throw new Error('No se encontró el registro');
            }
            // Eliminar el registro de la base de datos
            await this.calendarRepository.remove(calendar);
            return calendar; // Return the deleted calendar
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




}