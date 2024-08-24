import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoPreguntas } from '../entities/foto-preguntas';
import { User } from '../../usuario/entities/user';
import { FotoPregunta } from '../dtos/foto-pregunta';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres de archivos únicos


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

    // Usar la raíz del proyecto para la ruta
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const fileName = `${uuidv4()}.jpg`;
    const filePath = path.join(uploadsDir, fileName);

    console.log('Uploads directory:', uploadsDir);
    console.log('File path:', filePath);
    console.log('File name:', fileName);

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
      console.log('Uploads directory created');
    }

    try {
      fs.writeFileSync(filePath, buffer);
      console.log('File saved:', filePath);
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Error saving file');
    }

    const fotoPregunta = new FotoPreguntas();
    fotoPregunta.nombreFoto = fileName; // Solo almacenar el nombre del archivo
    fotoPregunta.idUsuario = user;

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

    return fotoPreguntas.map(fotoPregunta => ({
      ...fotoPregunta,
      nombreFoto: `http:192.168.0.22:3000/uploads/${fotoPregunta.nombreFoto}`, // Ruta pública para el archivo
    }));
  }


}
