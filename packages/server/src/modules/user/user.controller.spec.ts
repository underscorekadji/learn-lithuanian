import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        ConfigService,
        JwtService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'John Doe',
        email: 'jogn.doe@test.com',
        password: 'test_password',
      };
      const result = { id: 1, ...createUserDto };
      jest.spyOn(userService, 'create').mockResolvedValue(result);

      expect(await userController.create(createUserDto)).toBe(result);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, name: 'John Doe' }];
      jest.spyOn(userService, 'findAll').mockResolvedValue(result);

      expect(await userController.findAll()).toBe(result);
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = { id: 1, name: 'John Doe' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(result);

      expect(await userController.findOne('1')).toBe(result);
      expect(userService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { username: 'Jane Doe' };
      const result = { id: 1, ...updateUserDto };
      jest.spyOn(userService, 'update').mockResolvedValue(result);

      expect(await userController.update('1', updateUserDto)).toBe(result);
      expect(userService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(userService, 'remove').mockResolvedValue();

      expect(await userController.remove('1')).toBeUndefined();
      expect(userService.remove).toHaveBeenCalledWith(1);
    });
  });
});
