import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../usuario/entities/user";
import { Pregunta } from "./pregunta";

@Entity()
export class Likes {

    @PrimaryGeneratedColumn()
    idLikes: number;

    @Column({default: 0})
    likes: number;

    @ManyToOne(() => User , user => user.likes)
    idUsuario: User;

    @ManyToOne(() => Pregunta, pregunta => pregunta.idPregunta, { onDelete: 'CASCADE' })
    pregunta: Pregunta;
    
}
