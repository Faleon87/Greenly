import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from '../entities/pregunta';
import { CreatePregunta } from '../dtos/create-pregunta';
import { User } from '../../usuario/entities/user';

@Injectable()
export class PreguntaServiceService {

    constructor(
        @InjectRepository(Pregunta)
        private readonly preguntaRepository: Repository<Pregunta>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
      async create(createPregunta: CreatePregunta): Promise<Pregunta> {
        const user = await this.userRepository.findOne({
            where: { idUser: createPregunta.idUsuario }
          });
      
        if (!user) {
          throw new Error(`User with ID ${createPregunta.idUsuario} not found`);
        }
      
        // Create a new Pregunta

        const pregunta = new Pregunta();
        pregunta.fechaHora = new Date();
        pregunta.pregunta = createPregunta.pregunta;
        pregunta.descripcion = createPregunta.descripcion;
        pregunta.nombreCultivo = createPregunta.nombreCultivo;
        pregunta.idUsuario = user; 
        return this.preguntaRepository.save(pregunta);
      }

      async findByUserId(idUsuario: number): Promise<Pregunta[]> {
        const user = await this.userRepository.findOne({ where: { idUser: idUsuario } });
    
        if (!user) {
            throw new Error(`User with ID ${idUsuario} not found`);
        }
    
        return this.preguntaRepository.find({
            where: { idUsuario: user }
        });
    }
}


