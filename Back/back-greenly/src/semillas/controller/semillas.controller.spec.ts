import { Test, TestingModule } from '@nestjs/testing';
import { SemillasController } from './semillas.controller';

describe('SemillasController', () => {
  let controller: SemillasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemillasController],
    }).compile();

    controller = module.get<SemillasController>(SemillasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
