import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { ApiResponse } from '../../common/interfaces/response.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private readonly secretKey = 'your-secret-key'; // 与前端保持一致的密钥

  private decryptPassword(encryptedPassword: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  async validateUser(username: string, encryptedPassword: string): Promise<User | any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return {
        code: 500,
        message: '用户名或密码错误',
      };
    }

    const password = this.decryptPassword(encryptedPassword);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        code: 500,
        message: '用户名或密码错误',
      };
    }
    return user;
  }

  async login(user: any): Promise<{ token: string; user: Partial<User> }> {
    const payload = {
      sub: user.id,
      username: user.username,
    };

    const { password, salt, secretKey, ...safeUserData } = user;

    // 添加调试信息
    console.log('JWT Payload:', payload);
    console.log('JWT Secret:', this.jwtService.sign(payload));

    return {
      token: this.jwtService.sign(payload),
      user: safeUserData,
    };
  }
}
