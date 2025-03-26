import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test',
        password: 'password',
        email: 'test@example.com',
      };

      const user: User = {
        id: '1',
        ...createUserDto,
        isActive: true,
      };

      mockUsersService.create.mockResolvedValue(user);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(user);
      expect(mockUsersService.create).toHaveBeenCalledWith(
        createUserDto.username,
        createUserDto.password,
        createUserDto.email,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: '1',
          username: 'test1',
          email: 'test1@example.com',
          isActive: true,
        },
        {
          id: '2',
          username: 'test2',
          email: 'test2@example.com',
          isActive: true,
        },
      ];

      mockUsersService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();

      expect(result).toEqual(users);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user: User = {
        id: '1',
        username: 'test',
        email: 'test@example.com',
        isActive: true,
      };

      mockUsersService.findById.mockResolvedValue(user);

      const result = await controller.findOne('1');

      expect(result).toEqual(user);
      expect(mockUsersService.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: Partial<User> = {
        username: 'updated',
        email: 'updated@example.com',
      };

      const user: User = {
        id: '1',
        ...updateUserDto,
        isActive: true,
      };

      mockUsersService.update.mockResolvedValue(user);

      const result = await controller.update('1', updateUserDto);

      expect(result).toEqual(user);
      expect(mockUsersService.update).toHaveBeenCalledWith('1', updateUserDto);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      mockUsersService.delete.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(mockUsersService.delete).toHaveBeenCalledWith('1');
    });
  });
}); 