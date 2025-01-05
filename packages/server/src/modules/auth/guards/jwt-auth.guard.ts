import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../../configuration/configuration.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['jwt'];
    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>(ConfigKeys.JWT_SECRET),
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return super.canActivate(context);
  }
}
