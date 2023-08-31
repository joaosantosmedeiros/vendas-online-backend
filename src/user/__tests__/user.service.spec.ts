import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { userEntityMock } from '../__mocks__/user-mock';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
            getUserByIdUsingRelations: jest
              .fn()
              .mockResolvedValue(userEntityMock),
            getUserById: jest.fn().mockResolvedValue(userEntityMock),
            createUser: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user in getUserByEmail', async () => {
    const user = await service.getUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in getUserByEmail', async () => {
    jest.spyOn(service, 'getUserByEmail').mockRejectedValue(new Error());

    expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrow();
  });

  it('should return error in getUserById', async () => {
    jest.spyOn(service, 'getUserById').mockRejectedValue(new Error());

    expect(service.getUserById(userEntityMock.id)).rejects.toThrow();
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });
});
