import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as CryptoUtil from '../../shared/utils/crypto.util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword123';
      const user: User = {
        id: 1,
        username: 'newuser',
        email: 'newuser@example.com',
        passwordHash: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      jest.spyOn(CryptoUtil, 'hashPassword').mockResolvedValue(hashedPassword);
      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      const result = await service.create(createUserDto);

      expect(result).toEqual(service['mapUserToResponse'](user));
    });

    it('should throw ConflictException if username or email already exists', async () => {
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword123';
      const user: User = {
        id: 1,
        username: 'newuser',
        email: 'newuser@example.com',
        passwordHash: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockRejectedValue({ code: '23505' });

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          username: 'testuser1',
          email: 'test1@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        } as User,
        {
          id: 2,
          username: 'testuser2',
          email: 'test2@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        } as User,
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users.map(service['mapUserToResponse']));
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(result).toEqual(service['mapUserToResponse'](user));
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(service['mapUserToResponse'](user));
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findByEmail('test@example.com')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByUsername', () => {
    it('should return a user by username', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findByUsername('testuser');

      expect(result).toEqual(service['mapUserToResponse'](user));
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findByUsername('testuser')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getPasswordHash', () => {
    it('should return the password hash of a user', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        passwordHash: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.getPasswordHash(user);

      expect(result).toEqual({ passwordHash: 'hashedPassword123' });
    });

    it('should throw NotFoundException if user not found', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        passwordHash: 'hashedPassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.getPasswordHash(user)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'updateduser',
      };

      const user: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(repository, 'merge').mockReturnValue({
        ...user,
        ...updateUserDto,
      });
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...user,
        ...updateUserDto,
      });

      const result = await service.update(1, updateUserDto);

      expect(result).toEqual(
        service['mapUserToResponse']({
          ...user,
          ...updateUserDto,
        }),
      );
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.update(1, {} as UpdateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if user not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
