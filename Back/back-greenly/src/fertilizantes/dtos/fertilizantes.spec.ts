import { CreateFertilizanteDto } from './create-fertilizantes';

describe('Fertilizantes', () => {
  it('should be defined', () => {
    expect(new CreateFertilizanteDto()).toBeDefined();
  });
});
