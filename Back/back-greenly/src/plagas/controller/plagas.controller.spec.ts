import { Test, TestingModule } from '@nestjs/testing';
import { PlagasController } from './plagas.controller';

describe('PlagasController', () => {
  let controller: PlagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlagasController],
    }).compile();

    controller = module.get<PlagasController>(PlagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
