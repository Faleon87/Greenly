import { Column, CreateDateColumn, Entity,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../usuario/entities/user";

@Entity('pregunta')
export class Pregunta {

    @PrimaryGeneratedColumn()
    idPregunta: number;

    @Column('text')
    pregunta: string;

    @ManyToOne(() => User, user => user.preguntas)
    idUsuario: User;
    

    @Column('text')
    descripcion: string;

    @Column('text')
    nombreCultivo: string;

    @CreateDateColumn()
    fechaHora: Date;

    


}
