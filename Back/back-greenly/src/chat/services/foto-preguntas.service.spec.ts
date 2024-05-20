import { Test, TestingModule } from '@nestjs/testing';
import { FotoPreguntasService } from './foto-preguntas.service';

describe('FotoPreguntasService', () => {
  let service: FotoPreguntasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoPreguntasService],
    }).compile();

    service = module.get<FotoPreguntasService>(FotoPreguntasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
