import { Test, TestingModule } from '@nestjs/testing';
import { PlantasController } from './plantas.controller';

describe('PlantasController', () => {
  let controller: PlantasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantasController],
    }).compile();

    controller = module.get<PlantasController>(PlantasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
