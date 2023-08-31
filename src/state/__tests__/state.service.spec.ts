import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from '../state.service';
import { stateEntityMock } from '../__mocks__/state-mock';

describe('StateService', () => {
  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StateService,
          useValue: {
            getAllStates: jest.fn().mockResolvedValue(stateEntityMock),
            create: jest.fn().mockResolvedValue(stateEntityMock[0]),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of states', async () => {
    const state = await service.getAllStates();
    expect(state).toEqual(stateEntityMock);
  });
});
