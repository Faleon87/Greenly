import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PreguntaServiceService } from '../services/pregunta-service.service';
import { FotoPreguntasService } from '../services/foto-preguntas.service';
import { LikesService } from '../services/likes.service';
import { UserService } from '../../usuario/services/user.service';
import { ReportsService } from '../services/reports.service';
import { Pregunta } from '../entities/pregunta';

@Controller('chat')
export class ChatController {
  constructor(private readonly preguntaService: PreguntaServiceService,
    private readonly fotoPreguntasService: FotoPreguntasService,
    private readonly likesService: LikesService,
    private readonly userService: UserService,
    private readonly reportsService: ReportsService,
  ) { }


  @Post()
  async create(
    @Body('question') question: string,
    @Body('description') description: string,
    @Body('plant') plant: string,
    @Body('image') image: string,
    @Body('idUser') idUser: number,
  ) {
    const preguntaDto = { pregunta: question, descripcion: description, idUsuario: idUser, nombreCultivo: plant }; // idUsuario is the id of the user who asked the question
    const preguntaResult = await this.preguntaService.create(preguntaDto); // Create the question

    if (!preguntaResult) {
      throw new Error('Error creating the question');
    }

    if (!preguntaResult.idPregunta) {
      throw new Error('The created question does not have an idPregunta');
    }


    const fotoPreguntaDto = { idPregunta: preguntaResult.idPregunta, nombreFoto: image, idUsuario: idUser }; // idPregunta is the id of the question

    console.log('fotoPreguntaDto', fotoPreguntaDto);

    const fotoPreguntaResult = await this.fotoPreguntasService.create(fotoPreguntaDto); // Create the image


    if (!fotoPreguntaResult) {
      throw new Error('Error creating the image');
    }

    const likes = 0;
    const crearlikes = await this.likesService.create({ likes, idUsuario: idUser, idPregunta: preguntaResult.idPregunta });

    return { preguntaResult, fotoPreguntaResult, crearlikes };



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

  @Post('report')
  async report(@Body('idPregunta') idPregunta: number, @Body('idUser') idUser: number) {
    return this.reportsService.create(idPregunta, idUser);
  }

  @Get('reports')
  async getReports() {
    return this.reportsService.findAll();
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.preguntaService.delete(id);
  }


  @Get('pregunta/:id')
  async getPregunta(@Param('id') id: number) {
    return this.preguntaService.findById(id);
  }



}