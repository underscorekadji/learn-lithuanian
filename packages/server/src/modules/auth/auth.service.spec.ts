import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as CryptoUtil from '../../shared/utils/crypto.util';
import { SigninDto } from './dto/signin.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findByUsername: jest.fn(),
            getPasswordHash: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signup', () => {
    it('should create a new user and return an access token', async () => {
      const signupDto: SignupDto = {
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'testpass',
      };
      const user = { id: 1, username: 'testuser', email: 'testuser@test.com' };
      const token = 'testtoken';

      jest.spyOn(userService, 'create').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.signup(signupDto);

      expect(userService.create).toHaveBeenCalledWith(signupDto);
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        sub: user.id,
      });
      expect(result).toEqual({ access_token: token });
    });
  });

  describe('login', () => {
    it('should return an access token if credentials are valid', async () => {
      const signinDto: SigninDto = {
        username: 'testuser',
        password: 'testpass',
      };
      const user = { id: 1, username: 'testuser' };
      const passwordHash = 'hashedpassword';
      const token = 'testtoken';

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(user);
      jest
        .spyOn(userService, 'getPasswordHash')
        .mockResolvedValue({ passwordHash });
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);
      jest.spyOn(CryptoUtil, 'comparePasswords').mockResolvedValue(true);

      const result = await authService.login(signinDto);

      expect(userService.findByUsername).toHaveBeenCalledWith(
        signinDto.username,
      );
      expect(userService.getPasswordHash).toHaveBeenCalledWith({ id: user.id });
      expect(CryptoUtil.comparePasswords).toHaveBeenCalledWith(
        signinDto.password,
        passwordHash,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        sub: user.id,
      });
      expect(result).toEqual({ access_token: token });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const signinDto: SigninDto = {
        username: 'testuser',
        password: 'testpass',
      };

      jest.spyOn(userService, 'findByUsername').mockImplementation(() => {
        throw new NotFoundException();
      });

      await expect(authService.login(signinDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const signinDto: SigninDto = {
        username: 'testuser',
        password: 'testpass',
      };
      const user = { id: 1, username: 'testuser' };
      const passwordHash = 'hashedpassword';

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(user);
      jest
        .spyOn(userService, 'getPasswordHash')
        .mockResolvedValue({ passwordHash });

      jest.spyOn(CryptoUtil, 'comparePasswords').mockResolvedValue(false);

      await expect(authService.login(signinDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
