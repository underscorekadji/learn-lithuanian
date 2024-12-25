import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should call AuthService.signup with correct parameters', async () => {
      const signupDto: SignupDto = {
        username: 'test',
        email: 'test@mail.com',
        password: 'test',
      };
      await controller.signup(signupDto);
      expect(service.signup).toHaveBeenCalledWith(signupDto);
    });

    it('should return the result of AuthService.signup', async () => {
      const result = { id: 1, email: 'test@mail.com', username: 'test' };
      jest.spyOn(service, 'signup').mockResolvedValueOnce(result);
      expect(
        await controller.signup({
          username: 'test',
          email: 'test@mail.com',
          password: 'test',
        }),
      ).toBe(result);
    });
  });
});
