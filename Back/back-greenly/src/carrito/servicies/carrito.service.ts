import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from '../entities/carrito';
import { Repository } from 'typeorm';
import { Productos } from 'src/productos/entities/productos';
import { User } from 'src/usuario/entities/user';


@Injectable()
export class CarritoService {
    constructor(
        @InjectRepository
            (Carrito)
        private carritoRepository: Repository<Carrito>,
        @InjectRepository
            (Productos)
        private productoRepository: Repository<Productos>

    ) { }

    
    async add(idUser: User, idProducto: Productos) {

        console.log(idUser, idProducto)

        const carrito = new Carrito();
        carrito.idUser = idUser;
        carrito.idProducto = idProducto;
        
        
        // Buscar el producto en la base de datos
        const producto = await this.productoRepository.findOne({ where: { idProducto: idProducto.idProducto } });
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
    
       
    
        // Asegurarse de que estamos insertando una nueva entidad
        return this.carritoRepository.insert(carrito);
    }


    async list(idUser: User) {
        return this.carritoRepository.find({
            where: { idUser: idUser },
            relations: ['idProducto']
        });
    }

    async delete(idUser: User, idProducto: Productos) {
        const result = this.carritoRepository.delete({ idUser, idProducto });
        console.log(result);
        if ((await result).affected) {
            return true;
        } else {
            return false;
        }
    }
   
    
}
