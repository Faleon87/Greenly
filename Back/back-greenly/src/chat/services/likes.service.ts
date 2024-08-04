import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from '../entities/likes';
import { User } from 'src/usuario/entities/user';
import { Repository } from 'typeorm';
import { CreateLikesDto } from '../dtos/likes';

@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Likes)
        private readonly likesRepository: Repository<Likes>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createLikes: CreateLikesDto ): Promise<Likes> {
        const user = await this.userRepository.findOne({
            where: { idUser: createLikes.idUsuario }
        });
        const like = new Likes();
        like.likes = 0;
        like.idUsuario = user; // Assign the User to idUsuario
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
