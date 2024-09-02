import { Column, CreateDateColumn, Entity,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../usuario/entities/user";
import { FotoPreguntas } from "./foto-preguntas";
import { Respuestas } from "./respuestas";
import { Likes } from "./likes";
import { Reports } from "./reports";

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

    @OneToMany(() => FotoPreguntas, fotoPreguntas => fotoPreguntas.pregunta, {cascade: true})
    fotos: FotoPreguntas[];

    @OneToMany(()=> Respuestas, respuestas => respuestas.pregunta , {cascade: true})
    respuestas: Respuestas[];

    @OneToMany(()=> Likes, likes => likes.pregunta, {cascade: true}) 
    likes: Likes[];

    @OneToMany(() => Reports, reports => reports.pregunta, {cascade: true})
    reports: Report[];



}
