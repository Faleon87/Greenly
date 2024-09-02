import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from '../entities/pregunta';
import { CreatePregunta } from '../dtos/create-pregunta';
import { User } from '../../usuario/entities/user';
import { PreguntaDetails } from '../dtos/pregunta-details';




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

      async findAll(): Promise<Pregunta[]> {
        return this.preguntaRepository.find({
          relations: ['idUsuario'],
        });
      }

      async delete(id: number): Promise<Pregunta> {

        console.log('Eliminando pregunta con ID', id);
        // Buscar la pregunta con el ID proporcionado
        const pregunta = await this.preguntaRepository.findOneOrFail({
          where: { idPregunta: id },
          relations: ['respuestas' , 'likes', 'reports', 'fotos' ],
        });
    
        // Eliminar la pregunta y las respuestas relacionadas automáticamente
        return this.preguntaRepository.remove(pregunta);
      }
     

      async findById(id: number): Promise<PreguntaDetails> {
        const pregunta = await this.preguntaRepository.findOneOrFail({
            where: { idPregunta: id },
            relations: ['idUsuario', 'fotos'],
        });

        const preguntaDetailDto = new PreguntaDetails();
        preguntaDetailDto.idPregunta = pregunta.idPregunta;
        preguntaDetailDto.pregunta = pregunta.pregunta;
        preguntaDetailDto.nombreCultivo = pregunta.nombreCultivo;
        preguntaDetailDto.fechaHora = pregunta.fechaHora;
        preguntaDetailDto.username = pregunta.idUsuario.username;
        preguntaDetailDto.nombreFoto = pregunta.fotos.length > 0 ? `https://greenly.ddns.net:3000/uploads/${pregunta.fotos[0].nombreFoto}` : null;

        return preguntaDetailDto;
    }


}


