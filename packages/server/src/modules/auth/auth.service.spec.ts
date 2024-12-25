import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should call userService.create with correct parameters', async () => {
      const signupDto: SignupDto = {
        username: 'testuser',
        email: 'testuser@mail.com',
        password: 'testpass',
      };
      await service.signup(signupDto);
      expect(userService.create).toHaveBeenCalledWith(signupDto);
    });

    it('should return the result of userService.create', async () => {
      const signupDto: SignupDto = {
        username: 'testuser',
        email: 'testuser@mail.com',
        password: 'testpass',
      };
      const result = {
        id: 1,
        username: 'testuser',
        email: 'testuser@mail.com',
      };
      jest.spyOn(userService, 'create').mockResolvedValue(result);

      expect(await service.signup(signupDto)).toEqual(result);
    });
  });
});
