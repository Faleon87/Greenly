import { CreatePlantDto } from '../dtos/create-plant-dto';

describe('CreatePlantDto', () => {
  it('should be defined', () => {
    expect(new CreatePlantDto()).toBeDefined();
  });
});
