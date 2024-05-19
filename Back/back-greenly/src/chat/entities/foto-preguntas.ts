import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from 'typeorm';
import { User } from '../../usuario/entities/user';

@Entity('fotopregunta')
export class FotoPreguntas {

    @PrimaryGeneratedColumn()
    idFotoPregunta: number;
  
    @Column({ length: 255 })
    nombreFoto: string;
   
  
    @ManyToOne(() => User)
    idUsuario: User;
  
   
    
}
