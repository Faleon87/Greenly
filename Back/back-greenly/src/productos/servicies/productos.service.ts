import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Productos, } from '../entities/productos';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {

    constructor(
        @InjectRepository(Productos)
        private productosRepository: Repository<Productos>
    ) { }

    async findAll(page: number = 1, pageSize: number = 10): Promise<Productos[]> {
        const productos = await this.productosRepository.createQueryBuilder('productos')
            .leftJoinAndSelect('productos.herramientas', 'herramientas')
            .leftJoinAndSelect('productos.semillas', 'semillas')
            .leftJoinAndSelect('productos.abonos', 'abonos')
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getMany();

        return productos.map(producto => {
            const { herramientas, semillas, abonos, ...rest } = producto;
            return {
                ...rest,
                ...(herramientas && { herramientas }),
                ...(semillas && { semillas }),
                ...(abonos && { abonos }),
            };
        });
    }



}
