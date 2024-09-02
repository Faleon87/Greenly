import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Productos, } from '../entities/productos';
import { DistinctOptions, Repository } from 'typeorm';
import { DtoproductoDtoget } from '../dto/dtoproducto-dtoget';

@Injectable()
export class ProductosService {

    constructor(
        @InjectRepository(Productos)
        private productosRepository: Repository<Productos>
    ) { }

    async findAll(): Promise<DtoproductoDtoget[]> {
        const productos = await this.productosRepository.find({
            select: ['idProducto', 'nombre', 'precio', 'stock', 'imagen', 'Categoria']
        });
        return productos;
    }



}
