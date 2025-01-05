import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            login: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('development'),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signup', () => {
    it('should signup a user and set a cookie', async () => {
      const signupDto: SignupDto = {
        username: 'test',
        email: 'test@mail.com',
        password: 'test',
      };
      const token = 'testToken';
      const res = {
        cookie: jest.fn(),
        send: jest.fn(),
      } as any;

      jest.spyOn(authService, 'signup').mockResolvedValue({ token });

      await authController.signup(signupDto, res);

      expect(authService.signup).toHaveBeenCalledWith(signupDto);
      expect(res.cookie).toHaveBeenCalledWith('jwt', token, expect.any(Object));
      expect(res.send).toHaveBeenCalledWith({ message: 'Signup successful' });
    });
  });

  describe('signin', () => {
    it('should signin a user and set a cookie', async () => {
      const signinDto: SigninDto = { username: 'test', password: 'test' };
      const token = 'testToken';
      const res = {
        cookie: jest.fn(),
        send: jest.fn(),
      } as any;

      jest.spyOn(authService, 'login').mockResolvedValue({ token });

      await authController.signin(signinDto, res);

      expect(authService.login).toHaveBeenCalledWith(signinDto);
      expect(res.cookie).toHaveBeenCalledWith('jwt', token, expect.any(Object));
      expect(res.send).toHaveBeenCalledWith({ message: 'Login successful' });
    });
  });

  describe('logout', () => {
    it('should logout a user and clear the cookie', async () => {
      const res = {
        clearCookie: jest.fn(),
        send: jest.fn(),
      } as any;

      await authController.logout(res);

      expect(res.clearCookie).toHaveBeenCalledWith('jwt');
      expect(res.send).toHaveBeenCalledWith({ message: 'Logout successful' });
    });
  });
});
