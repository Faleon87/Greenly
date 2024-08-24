
import { Entity,  Column,  PrimaryGeneratedColumn } from 'typeorm';

@Entity('reports')
export class Reports {

    @PrimaryGeneratedColumn()
    idReport: number;

    @Column()
    idUser: number;

    @Column()
    idPregunta: number;

    @Column()
    createdAt: Date;

}
