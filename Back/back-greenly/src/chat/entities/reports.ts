
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('reports')
export class Reports {

 @PrimaryGeneratedColumn()
    idReport: number;
    
    @Column()
    idUser: number;

    @Column()
    idPregunta: number;

    

}
