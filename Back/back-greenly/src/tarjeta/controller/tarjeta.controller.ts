import { Body, Controller, Post } from '@nestjs/common';
import { TarjetaService } from '../servicies/tarjeta.service';



@Controller('tarjeta')
export class TarjetaController {


    constructor(
        private readonly tarjetaService: TarjetaService
    ) { }

    @Post('keepTarjeta')
    async keepTarjetaSendEmail(@Body() body: { idUsuario: number, cardNumber: string, name: string, expiry: string, cvv: number }) {
        const { idUsuario, cardNumber, name, expiry, cvv } = body;

    
        return this.tarjetaService.keepTarjeta(idUsuario, cardNumber, name, expiry, cvv);
    } 
   



}
