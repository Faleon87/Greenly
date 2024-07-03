import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Plantas } from "../../plantas/entities/plantas";
import { User } from "../../usuario/entities/user";

@Entity('calendar')   
export class Calendar {

    @PrimaryGeneratedColumn()
    idCalendario: number;

    @Column({type: 'date'})
    fecha: Date;

    @Column({type: 'varchar', length: 8})
    tipoAcción: string;


    @ManyToOne(() => Plantas, plantas => plantas.idPlanta)
    idPlanta: Plantas;


    @ManyToOne(() => User, user => user.idUser)
    idUsuario: User;

    @DeleteDateColumn()
    deletedAt?: Date;

}
