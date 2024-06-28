import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PreguntaServiceService } from '../services/pregunta-service.service';
import { FotoPreguntasService } from '../services/foto-preguntas.service';
import { LikesService } from '../services/likes.service';
import { UserService } from '../../usuario/services/user.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly preguntaService: PreguntaServiceService,
    private readonly fotoPreguntasService: FotoPreguntasService,
    private readonly likesService: LikesService,
    private readonly userService: UserService
  ) { }


  @Post()
  async create(
    @Body('question') question: string,
    @Body('description') description: string,
    @Body('plant') plant: string,
    @Body('image') image: string,
    @Body('idUser') idUser: number,
  ) {
    const preguntaDto = { pregunta: question, descripcion: description, idUsuario: idUser, nombreCultivo: plant };
    const fotoPreguntaDto = { nombreFoto: image, idUsuario: idUser };
    const likesDto = { idUsuario: idUser, likes: 0 }; // Add the missing properties 'likes' and 'idUsuario' to the 'likesDto' object
    const preguntaResult = await this.preguntaService.create(preguntaDto); 
    const fotoPreguntasResult = await this.fotoPreguntasService.create(fotoPreguntaDto);
    const likesResult = await this.likesService.create(likesDto);
    return { preguntaResult, fotoPreguntasResult, likesResult };
  }

  @Get('renderchat')
  async getAllData() {
    const preguntaResult = (await this.preguntaService.findAll()).sort((a, b) => a.idPregunta - b.idPregunta);
    const fotoPreguntasResult = (await this.fotoPreguntasService.findAll()).sort((a, b) => a.idFotoPregunta - b.idFotoPregunta);
    const likesResult = (await this.likesService.findAll()).sort((a, b) => a.idLikes - b.idLikes);
    return { preguntaResult, fotoPreguntasResult, likesResult };
  }

  @Put('updatelikes/:id')
  async updateLikes(@Param('id') id: number, @Body('likes') likes: number) {
    return this.likesService.updateLikes(id, likes);
  }
  
}