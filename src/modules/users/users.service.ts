import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CacheService } from '../../common/services/cache.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cacheService: CacheService, // 确保这里正确注入
  ) {}

  async create(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await this.usersRepository.save(user);
    await this.cacheService.set(`user:${savedUser.id}`, savedUser);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findById(id: string): Promise<User> {
    // 尝试从缓存获取
    const cachedUser = await this.cacheService.get<User>(`user:${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    // 从数据库获取
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 存入缓存
    await this.cacheService.set(`user:${id}`, user);
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, data);
    const updatedUser = await this.usersRepository.save(user);
    await this.cacheService.set(`user:${id}`, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
    await this.cacheService.del(`user:${id}`);
  }
}

