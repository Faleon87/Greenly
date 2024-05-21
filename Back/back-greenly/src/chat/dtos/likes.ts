import { IsNumber, IsNotEmpty } from 'class-validator';
import { User } from '../../usuario/entities/user';
import { ManyToOne } from 'typeorm';

export class CreateLikesDto {
  @IsNumber()
  @IsNotEmpty()
  likes: number;

  @IsNotEmpty()
  @ManyToOne(() => User, user => user.idUser)
  idUsuario: number;
}