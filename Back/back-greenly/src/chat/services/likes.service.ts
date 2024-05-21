import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from '../entities/likes';
import { User } from 'src/usuario/entities/user';
import { Repository } from 'typeorm';
import { CreateLikesDto } from '../dtoS/likes';

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

    async findByUserId(idUsuario: number): Promise<Likes[]> {
        const user = await this.userRepository.findOne({ where: { idUser: idUsuario } });

        if (!user) {
            throw new Error(`User with ID ${idUsuario} not found`);
        }

        return this.likesRepository.find({
            where: { idUsuario: user }
        });

    }
}
