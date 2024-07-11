import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/usuario/entities/user";

@Entity('tarjeta')
export class Tarjeta {
  
    @PrimaryGeneratedColumn( )
    idTarjeta: number;

    @Column()
    numeroTarjeta: string;

    @Column()
    nombre: string;

    @Column()
    fechaVencimiento: string;

    @Column()
    codigoSeguridad: string;

    @ManyToOne(() => User, user => user.tarjeta)
    @JoinColumn({ name: 'idUser' })
    idUser: number;

    @Column()
    cardhash: string;

}
