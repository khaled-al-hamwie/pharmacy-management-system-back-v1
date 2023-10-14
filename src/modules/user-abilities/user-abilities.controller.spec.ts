import { Test, TestingModule } from '@nestjs/testing';
import { UserAbilitiesController } from './user-abilities.controller';
import { UserAbilitiesService } from './user-abilities.service';

describe('UserAbilitiesController', () => {
  let controller: UserAbilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAbilitiesController],
      providers: [UserAbilitiesService],
    }).compile();

    controller = module.get<UserAbilitiesController>(UserAbilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
