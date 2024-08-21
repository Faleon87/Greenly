import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoPreguntas } from '../entities/foto-preguntas';
import { User } from '../../usuario/entities/user';
import { FotoPregunta } from '../dtos/foto-pregunta';


@Injectable()
export class FotoPreguntasService {

    constructor(
        @InjectRepository(FotoPreguntas)
        private readonly fotoPreguntasRepository: Repository<FotoPreguntas>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    async create(createFotoPregunta: FotoPregunta): Promise<FotoPreguntas> {
      const user = await this.userRepository.findOne({
        where: { idUser: createFotoPregunta.idUsuario }
      });
  
      if (!user) {
        throw new Error(`User with ID ${createFotoPregunta.idUsuario} not found`);
      }
  
      const base64Data = createFotoPregunta.nombreFoto.replace(/^data:image\/jpeg;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
  
      const fotoPregunta = new FotoPreguntas();
      fotoPregunta.nombreFoto = buffer;
      fotoPregunta.idUsuario = user; // Assign the User to idUsuario
  
      return this.fotoPreguntasRepository.save(fotoPregunta);
    }

    async findByUserId(idUsuario: number): Promise<FotoPreguntas[]> {
        const user = await this.userRepository.findOne({ where: { idUser: idUsuario } });
    
        if (!user) {
            throw new Error(`User with ID ${idUsuario} not found`);
        }
    
        return this.fotoPreguntasRepository.find({
            where: { idUsuario: user }
        });

    }
    
    async findAll(): Promise<any[]> {
      const fotoPreguntas = await this.fotoPreguntasRepository.find();
    
      return fotoPreguntas.map(fotoPregunta => {
        const nombreFotoData = Buffer.isBuffer(fotoPregunta.nombreFoto)
          ? fotoPregunta.nombreFoto.toString('base64')
          : fotoPregunta.nombreFoto;
        return {
          ...fotoPregunta,
          nombreFoto: nombreFotoData,
        };
      });
    }


}
