import { Column, Entity, IsNull, Not, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity('fertilizantes')
export class Fertilizantes {

    @PrimaryGeneratedColumn()
    idFertilizante: number;

    @Column()
    @IsNotEmpty({ message: 'El nombre de el fertilizante es requerido' })
    nombreFertilizante: string;

    @Column()
    @IsNotEmpty({ message: 'El tipo de el fertilizante es requerido' })
    tipoFertilizante: string;

    @Column()
    @IsNotEmpty({ message: 'La imagen de el fertilizante es requerida' })
    img: string;

    @Column({ nullable: true })
    descripcion: string;

    @Column({ nullable: true })
    elaboracion: string;

    @Column({ nullable: true })
    ubicacion: string;

    @Column({ nullable: true })
    cantidad: string;

    

}
