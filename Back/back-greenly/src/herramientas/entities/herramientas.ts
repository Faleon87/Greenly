import { Column,  JoinColumn,  OneToOne, PrimaryGeneratedColumn , Entity } from "typeorm";
import { Productos } from "src/productos/entities/productos";

@Entity('herramientas')
export class Herramientas {

    @PrimaryGeneratedColumn()
    idHerramienta: number;

    @Column()
    marca: string;

    @Column({type: 'float'})
    peso: number;


    @OneToOne(() => Productos, productos => productos.herramientas)
    @JoinColumn({name: 'idProducto'})
    productos: Productos;

}
