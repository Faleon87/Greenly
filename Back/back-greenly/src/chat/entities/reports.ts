
import { Entity,  Column,  PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pregunta } from './pregunta';

@Entity('reports')
export class Reports {

    @PrimaryGeneratedColumn()
    idReport: number;

    @Column()
    idUser: number;

    @Column()
    createdAt: Date;

    @ManyToOne(() => Pregunta, pregunta => pregunta.reports, { onDelete: 'CASCADE' })
    pregunta: Pregunta;

}
