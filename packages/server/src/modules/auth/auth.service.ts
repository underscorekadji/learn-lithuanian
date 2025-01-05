import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { comparePasswords } from '../../shared/utils/crypto.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = await this.userService.create(signupDto);
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async login(loginDto: SigninDto) {
    let user;
    try {
      user = await this.userService.findByUsername(loginDto.username);
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user || !user.id) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash } = await this.userService.getPasswordHash({
      id: user.id,
    });

    if (!user || !(await comparePasswords(loginDto.password, passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
