import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TarjetaService } from '../servicies/tarjeta.service';
import { Tarjeta } from '../entities/tarjeta';



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

    @Get('guardadas/:idUsuario')
    async getTarjetasGuardadas(@Param('idUsuario') idUsuario: number) {
        return this.tarjetaService.getTarjetasGuardadas(idUsuario);
    }
   



}
