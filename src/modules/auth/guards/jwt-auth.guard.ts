import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('Auth Header:', request.headers.authorization);

    try {
      const result = await super.canActivate(context);
      const user = request.user;
      console.log('验证结果:', result);
      console.log('用户信息:', user);
      return result as boolean;
    } catch (error) {
      console.error('JWT验证错误:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      throw new UnauthorizedException('无效的token');
    }
  }
}
