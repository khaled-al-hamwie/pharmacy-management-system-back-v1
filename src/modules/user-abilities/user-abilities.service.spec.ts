import { Test, TestingModule } from '@nestjs/testing';
import { UserAbilitiesService } from './user-abilities.service';

describe('UserAbilitiesService', () => {
  let service: UserAbilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAbilitiesService],
    }).compile();

    service = module.get<UserAbilitiesService>(UserAbilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
