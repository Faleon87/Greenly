import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity('plagas')
export class Plagas {
   

    @PrimaryGeneratedColumn()
    idPlaga: number;

    @Column()
    @IsNotEmpty({message: 'El nombre de la plaga es requerido'})    
    nombrePlaga: string;

    @Column()
    @IsNotEmpty({message: 'La descripcion de la plaga es requerida'})
    descripcion: string;
    
    @Column()
    @IsNotEmpty({message: 'Las acciones preventivas de la plaga son requeridas'})
    accionesPreventivas: string;
    
    @Column()
    @IsNotEmpty({message: 'Las acciones de lucha directa de la plaga son requeridas'})
    luchaDirecta: string;

    @Column()
    @IsNotEmpty({message: 'La imagen de la plaga es requerida'})
    img: string;

    @DeleteDateColumn()
    deletedAt?: Date;

}
