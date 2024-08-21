import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from 'typeorm';
import { User } from '../../usuario/entities/user';

@Entity('fotopregunta')
export class FotoPreguntas {

    @PrimaryGeneratedColumn()
    idFotoPregunta: number;
  
    @Column('bytea')
    nombreFoto: Buffer;
   
  
    @ManyToOne(() => User , user => user.fotosPreguntas)
    idUsuario: User;

}
