import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from 'typeorm';
import { User } from '../../usuario/entities/user';
import { Pregunta } from './pregunta';


@Entity('fotopregunta')
export class FotoPreguntas {

    @PrimaryGeneratedColumn()
    idFotoPregunta: number;

    @Column()
    nombreFoto: string;


    @ManyToOne(() => User, user => user.fotosPreguntas)
    idUsuario: User;

    @ManyToOne(() => Pregunta, pregunta => pregunta.fotos, { onDelete: 'CASCADE' })
    pregunta: Pregunta;

    @CreateDateColumn()
    fechaHora: Date;

}
