import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoPreguntas } from '../entities/foto-preguntas';
import { User } from '../../usuario/entities/user';
import { FotoPregunta } from '../dtos/foto-pregunta';
import * as fs from 'fs'; // Para manejar archivos
import * as path from 'path'; // Para manejar rutas de archivos
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres de archivos únicos
import { Pregunta } from '../entities/pregunta';

@Injectable()
export class FotoPreguntasService {
  constructor(
    @InjectRepository(FotoPreguntas)
    private readonly fotoPreguntasRepository: Repository<FotoPreguntas>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
  ) { }



  async create(createFotoPregunta: FotoPregunta): Promise<FotoPreguntas> {

    const user = await this.userRepository.findOne({
      where: { idUser: createFotoPregunta.idUsuario }
    });

    if (!user) {
      throw new Error(`User with ID ${createFotoPregunta.idUsuario} not found`);
    }

    const pregunta = await this.preguntaRepository.findOne({
      where: { idPregunta: createFotoPregunta.idPregunta }
    });

    if (!pregunta) {
      throw new Error(`Pregunta with ID ${createFotoPregunta.idPregunta} not found`);
    }

    // Crear una nueva instancia de FotoPreguntas
    const fotoPregunta = new FotoPreguntas();
    fotoPregunta.nombreFoto = createFotoPregunta.nombreFoto;
    fotoPregunta.idUsuario = user;
    fotoPregunta.pregunta = pregunta;  // Asignar la entidad Pregunta, no solo el ID

    // Generar un nombre de archivo único
    const uniqueFilename = `${uuidv4()}.jpg`;

    // Ruta completa donde se guardará la imagen
    const uploadPath = path.resolve(process.cwd(), 'uploads', uniqueFilename);

    // Asegurarse de que la carpeta uploads existe
    if (!fs.existsSync(path.dirname(uploadPath))) {
      fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
    }

    // Obtener el buffer de la imagen o contenido
    const imageContent = Buffer.from(createFotoPregunta.nombreFoto, 'base64'); // Suponiendo que recibes la imagen como base64

    // Guardar la imagen en la carpeta uploads
    fs.writeFileSync(uploadPath, imageContent);

    // Actualizar el nombre de la foto con el nombre único
    fotoPregunta.nombreFoto = uniqueFilename;

    // Guardar en la base de datos
    return this.fotoPreguntasRepository.save(fotoPregunta);
  }

  async findAll(): Promise<any[]> {
    const fotoPreguntas = await this.fotoPreguntasRepository.find();

    return fotoPreguntas.map(fotoPregunta => ({
      ...fotoPregunta,
      nombreFoto: `http://greenly.ddns.net:3000/uploads/${fotoPregunta.nombreFoto}`, // Ruta pública para el archivo
    }));
  }
}