import { Controller, Get } from '@nestjs/common';
import { ProductosService } from '../servicies/productos.service';

@Controller('productos')
export class ProductosController {

    constructor(
        private readonly productosService: ProductosService
    ) { }

    @Get('card')
    async obtenerProductos() {
        return this.productosService.findAll();
    }
    

}
