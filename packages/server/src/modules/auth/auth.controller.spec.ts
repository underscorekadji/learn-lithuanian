import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
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
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should call AuthService.signup with correct parameters', async () => {
      const signupDto: SignupDto = {
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'testpass',
      };
      await authController.signup(signupDto);
      expect(authService.signup).toHaveBeenCalledWith(signupDto);
    });

    it('should return the result of AuthService.signup', async () => {
      const result = {
        access_token: 'token',
      };
      jest.spyOn(authService, 'signup').mockResolvedValue(result);
      expect(
        await authController.signup({
          username: 'testuser',
          email: 'testuser@test.com',
          password: 'testpass',
        }),
      ).toBe(result);
    });
  });

  describe('signin', () => {
    it('should call AuthService.login with correct parameters', async () => {
      const signinDto: SigninDto = {
        username: 'testuser',
        password: 'testpass',
      };
      await authController.signin(signinDto);
      expect(authService.login).toHaveBeenCalledWith(signinDto);
    });

    it('should return the result of AuthService.login', async () => {
      const result = { access_token: 'token' };
      jest.spyOn(authService, 'login').mockResolvedValue(result);
      expect(
        await authController.signin({
          username: 'testuser',
          password: 'testpass',
        }),
      ).toBe(result);
    });
  });
});
