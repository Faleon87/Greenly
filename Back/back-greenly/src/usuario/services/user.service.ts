import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(username: string, email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username, email, password },
    });
    if (user) {
      return user;
    }
    return null;
  }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(idUser: number): Promise<User> {
        return this.userRepository.findOne({ where: { idUser } });
    }

}
