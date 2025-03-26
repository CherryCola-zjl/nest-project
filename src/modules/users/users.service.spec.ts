import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CacheService } from '../../common/services/cache.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let cacheService: CacheService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    cacheService = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        username: 'test',
        password: 'password',
        email: 'test@example.com',
      };

      const user = {
        id: '1',
        ...createUserDto,
        isActive: true,
      };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockResolvedValue(user);

      const result = await service.create(
        createUserDto.username,
        createUserDto.password,
        createUserDto.email,
      );

      expect(result).toEqual(user);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalled();
    });

    it('should throw ConflictException if username exists', async () => {
      const createUserDto = {
        username: 'test',
        password: 'password',
        email: 'test@example.com',
      };

      mockRepository.findOne.mockResolvedValue({ id: '1', ...createUserDto });

      await expect(
        service.create(
          createUserDto.username,
          createUserDto.password,
          createUserDto.email,
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findById', () => {
    it('should return user from cache if exists', async () => {
      const user = {
        id: '1',
        username: 'test',
      };

      mockCacheService.get.mockResolvedValue(user);

      const result = await service.findById('1');

      expect(result).toEqual(user);
      expect(mockCacheService.get).toHaveBeenCalled();
      expect(mockRepository.findOne).not.toHaveBeenCalled();
    });

    it('should return user from database if not in cache', async () => {
      const user = {
        id: '1',
        username: 'test',
      };

      mockCacheService.get.mockResolvedValue(null);
      mockRepository.findOne.mockResolvedValue(user);

      const result = await service.findById('1');

      expect(result).toEqual(user);
      expect(mockCacheService.get).toHaveBeenCalled();
      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user not found', async () => {
      mockCacheService.get.mockResolvedValue(null);
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findById('1')).rejects.toThrow(NotFoundException);
    });
  });
}); 