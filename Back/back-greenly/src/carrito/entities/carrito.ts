import { OneToOne, PrimaryGeneratedColumn , Entity, ManyToMany } from "typeorm";
import { User } from "src/usuario/entities/user";
import { Productos } from "src/productos/entities/productos";

@Entity('carrito')
export class Carrito {

    @PrimaryGeneratedColumn()
    idCarrito: number;

    @OneToOne(() => User, user => user.idUser)
    idUsuario: User;

    @ManyToMany(() => Productos, productos => productos.idProducto)
    productos: Productos[];
}   
