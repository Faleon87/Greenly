import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CarritoService } from '../servicies/carrito.service';
import { Productos } from 'src/productos/entities/productos';
import { User } from 'src/usuario/entities/user';

@Controller('carrito')
export class CarritoController {

    constructor(
        private readonly carritoService: CarritoService
    ) { }

    @Post('add')
    async agregarProducto(@Body() body: { idUser: User; idProducto: Productos }) { // Update the type of 'idProducto'

        const { idUser, idProducto } = body;

        if (!Number.isFinite(idUser)) {
            throw new Error('idUser debe ser un número válido.');
        }

        return this.carritoService.add(idUser, idProducto);
    }

    @Get('list')
    async listarCarrito(@Query('idUser') idUser: User) { // Acepta idUser como parámetro de consulta
        return this.carritoService.list(idUser);
    }

    @Delete('delete')
    async eliminarProducto(@Query('idUser') idUser: User, @Query('idProducto') idProducto: Productos) { // Update the type of 'idProducto'
        const result= this.carritoService.delete(idUser, idProducto);
        return result;
    }


}
