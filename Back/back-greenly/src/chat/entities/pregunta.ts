import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../usuario/entities/user";

@Entity('pregunta')
export class Pregunta {

    @PrimaryGeneratedColumn()
    idPregunta: number;

    @Column('text')
    pregunta: string;

    @ManyToMany(() => User)
    idUsuario: User;

    @CreateDateColumn()
    fechaHora: Date;

    

}
