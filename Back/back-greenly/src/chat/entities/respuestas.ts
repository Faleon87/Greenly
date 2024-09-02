import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../usuario/entities/user';
import { Pregunta } from './pregunta';

@Entity('respuestas')
export class Respuestas {

    @PrimaryGeneratedColumn()
    idRespuesta: number;

    @Column('text')
    respuesta: string;

    @ManyToOne(() => User , user => user.idUser)
    idUsuario: User;

    @CreateDateColumn()
    fechaHora: Date;

    @ManyToOne(() => Pregunta, pregunta => pregunta.respuestas, { onDelete: 'CASCADE' })
    pregunta: Pregunta;
}
