import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CalendarService } from '../services/calendar.service';
import { CalendarInsertDto } from '../dtos/calendar-insert-dto';


@Controller('calendar')
export class CalendarController {

    constructor(private calendarService: CalendarService) { }

    @Post('plantas')
    async insertarCalendar(@Body() calendarInsertDto: CalendarInsertDto) {
        try {
            return this.calendarService.insertarCalendar(calendarInsertDto);        
        } catch (error) {
            console.log(error);
            return error;
        }   
    }

    @Get('plantas/:fecha/:idUser')
    async obtenerCalendarPorFechaYUsuario(@Param('fecha') fecha: string, @Param('idUser') idUser: string) {
        try {
             return this.calendarService.obtenerPorFechaYUsuario(fecha, idUser);;
        } catch (error) {
            console.error(error);
            throw new HttpException('Error al obtener los datos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
