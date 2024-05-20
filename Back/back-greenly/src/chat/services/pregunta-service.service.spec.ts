import { Test, TestingModule } from '@nestjs/testing';
import { PreguntaServiceService } from './pregunta-service.service';

describe('PreguntaServiceService', () => {
  let service: PreguntaServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreguntaServiceService],
    }).compile();

    service = module.get<PreguntaServiceService>(PreguntaServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
