import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { User } from "src/usuario/entities/user";
import { Productos } from "src/productos/entities/productos";

@Entity('carrito')
export class Carrito {
    @PrimaryGeneratedColumn()
    idCarrito: number;

    @ManyToOne(() => User, user => user.carrito)
    @JoinColumn({ name: 'idUser' })
    idUser: User;

    @ManyToOne(() => Productos , productos => productos.carrito)
    @JoinColumn({ name: 'idProducto' })
    idProducto: Productos;
}