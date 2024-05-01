import * as bcrypt from 'bcrypt';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [{ username: username }, { email: username }],
    });
    if (user && user.password && password && await bcrypt.compare(password, user.password)) {
      // La contraseña coincide
      return user;
    }
    // La contraseña no coincide, el usuario no existe, o el usuario no tiene una contraseña
    return null;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async onModuleInit(): Promise<void> {
    let adminUser = await this.userRepository.findOne({
      where: { username: 'admin' },
    });
    if (!adminUser) {
      adminUser = new User();
      adminUser.username = process.env.ADMIN_USERNAME;
      adminUser.email = process.env.ADMIN_EMAIL;
      adminUser.nombre = process.env.ADMIN_NAME;
      adminUser.apellido = process.env.ADMIN_LASTNAME;
    }
    const salt = await bcrypt.genSalt();
    if (process.env.ADMIN_PASSWORD) {
      adminUser.password = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      await this.userRepository.save(adminUser);
    } else {
      throw new Error('ADMIN_PASSWORD is not defined');
    }
  }
}
