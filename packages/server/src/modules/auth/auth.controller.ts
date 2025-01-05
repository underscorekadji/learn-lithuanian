import { Response } from 'express';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ConfigKeys } from '../configuration/configuration.enum';
import { convertTimeToMs } from '../../shared/utils/time.util';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    const { token } = await this.authService.signup(signupDto);
    this.setCookie(res, token);
    return res.send({ message: 'Signup successful' });
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto, @Res() res: Response) {``
    const { token } = await this.authService.login(signinDto);
    this.setCookie(res, token);
    return res.send({ message: 'Login successful' });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    this.clearCookie(res);
    return res.send({ message: 'Logout successful' });
  }

  private setCookie(res: Response, token: string) {
    const jwtExpirationTime = this.configService.get<string>(
      ConfigKeys.JWT_EXPIRATION_TIME,
    );
    if (!jwtExpirationTime) {
      throw new Error('JWT expiration time is not defined');
    }
    const maxAge = convertTimeToMs(jwtExpirationTime);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      maxAge: maxAge,
      sameSite: 'strict',
      path: '/',
    });
  }

  private clearCookie(res: Response) {
    res.clearCookie('jwt');
  }
}
