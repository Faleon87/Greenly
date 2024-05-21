import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PreguntaServiceService } from '../services/pregunta-service.service';
import { FotoPreguntasService } from '../services/foto-preguntas.service';
import { LikesService } from '../services/likes.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly preguntaService: PreguntaServiceService,
        private readonly fotoPreguntasService: FotoPreguntasService,
        private readonly likesService: LikesService,) { }


        @Post()
        async create(
          @Body('question') question: string,
          @Body('description') description: string,
          @Body('plant') plant: string,
          @Body('image') image: string,
          @Body('idUser') idUser: number,
        ) {
          const preguntaDto = { pregunta: question, descripcion: description, idUsuario: idUser, nombreCultivo: plant };
          const fotoPreguntaDto = {  nombreFoto: image, idUsuario: idUser };
          const likesDto = { idUsuario: idUser, likes: 0 }; // Add the missing properties 'likes' and 'idUsuario' to the 'likesDto' object

          const preguntaResult = await this.preguntaService.create(preguntaDto);
          const fotoPreguntasResult = await this.fotoPreguntasService.create(fotoPreguntaDto);
          const likesResult = await this.likesService.create(likesDto);

          return { preguntaResult, fotoPreguntasResult, likesResult};
        }

        @Get(':id')
        async getChatData(@Param('id') idUser: number) {

            const preguntaResult = await this.preguntaService.findByUserId(Number(idUser));
            const fotoPreguntasResult = await this.fotoPreguntasService.findByUserId(Number(idUser));
            const likesResult = await this.likesService.findByUserId(Number(idUser));

            
        
            return { preguntaResult, fotoPreguntasResult, likesResult };
        }

    

}
