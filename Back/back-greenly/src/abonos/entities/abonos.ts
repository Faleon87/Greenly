import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Productos } from "src/productos/entities/productos";

@Entity('abonos')
export class Abonos {

    @PrimaryGeneratedColumn()
    idAbono: number;

    @Column()
    tipoAbono: string;

    @OneToOne(() => Productos, productos => productos.abonos)
    @JoinColumn({name: 'idProducto'})
    productos: Productos;
    

}
