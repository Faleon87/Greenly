import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from '../entities/likes';
import { User } from 'src/usuario/entities/user';
import { Repository } from 'typeorm';
import { CreateLikesDto } from '../dtos/likes';
import { Pregunta } from '../entities/pregunta';

@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Likes)
        private readonly likesRepository: Repository<Likes>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Pregunta)
        private readonly preguntaRepository: Repository<Pregunta>
    ) { }

    async create(createLikes: CreateLikesDto ): Promise<Likes> {
        const user = await this.userRepository.findOne({
            where: { idUser: createLikes.idUsuario }
        });
        if (!user) {
            throw new Error(`User with ID ${createLikes.idUsuario} not found`);
        }
       
        const idPregunta = await this.preguntaRepository.findOne({
            where: { idPregunta: createLikes.idPregunta }
        });


        if (!idPregunta) {
            throw new Error(`Pregunta with ID ${createLikes.idPregunta} not found`);
        }


        const like = new Likes();
        like.likes = createLikes.likes;
        like.idUsuario = user;
        like.pregunta = idPregunta;

        return this.likesRepository.save(like);
    }


    async findAll(): Promise<Likes[]> {
        return this.likesRepository.find({
            relations: ['idUsuario']
        });
    }

    async updateLikes(id: number, likes: number): Promise<Likes> {
        const likesEntity = await this.likesRepository.findOne({
            where: {idLikes: id },
            });
        likesEntity.likes = likes;
        return this.likesRepository.save(likesEntity);
      }
    
}
