import { Test, TestingModule } from '@nestjs/testing';
import { AbonosController } from './abonos.controller';

describe('AbonosController', () => {
  let controller: AbonosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbonosController],
    }).compile();

    controller = module.get<AbonosController>(AbonosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
