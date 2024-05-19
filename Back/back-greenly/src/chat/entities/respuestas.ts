import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../usuario/entities/user';

@Entity('respuestas')
export class Respuestas {

    @PrimaryGeneratedColumn()
    idRespuesta: number;

    @Column('text')
    respuesta: string;

    @ManyToOne(() => User)
    idUsuario: User;

    @CreateDateColumn()
    fechaHora: Date;

}
