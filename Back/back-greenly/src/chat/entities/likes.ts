import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../usuario/entities/user";

@Entity()
export class Likes {

    @PrimaryGeneratedColumn()
    idLikes: number;

    @Column({default: 0})
    likes: number;

    @ManyToOne(() => User , user => user.likes)
    idUsuario: User;
}
