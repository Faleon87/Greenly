import { Column, OneToOne, PrimaryGeneratedColumn , Entity, JoinColumn } from "typeorm";
import { Productos } from "src/productos/entities/productos";

@Entity('semillas')
export class Semillas {

    @PrimaryGeneratedColumn()
    idSemilla: number;

    @Column()
    tipoSemilla: string;

    @OneToOne(() => Productos, productos => productos.semillas)
    @JoinColumn({name: 'idProducto'})
    productos: Productos;


}
