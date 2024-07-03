import { Body, Controller, Post } from '@nestjs/common';
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
}
