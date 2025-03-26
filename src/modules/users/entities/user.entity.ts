import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ description: '用户id' })
  @Column({ unique: true })
  id: string;

  @ApiProperty({ description: '用户名' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: '密码' })
  @Column()
  password: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: '是否激活' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: '最后登录时间' })
  @Column({ nullable: true })
  lastLoginAt: Date;
} 