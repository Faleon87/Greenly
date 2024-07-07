import { Herramientas } from "src/herramientas/entities/herramientas";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Semillas } from "src/semillas/entities/semillas";
import { Abonos } from "src/abonos/entities/abonos";

@Entity('productos')
export class Productos {
   
    @PrimaryGeneratedColumn()
    idProducto: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({type: 'float'})
    precio: number;

    @Column()
    stock: number;

    @Column({nullable: true})
    imagen: string;

    @Column()
    Categoria: string;

    @OneToOne(() => Herramientas, herramientas => herramientas.productos)
   
    herramientas: Herramientas;

    @OneToOne(() => Semillas, semillas => semillas.productos)

    semillas: Semillas;

    @OneToOne(() => Abonos, abonos => abonos.productos)

    abonos: Abonos;







}
