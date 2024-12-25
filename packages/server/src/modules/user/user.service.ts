import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { hashPassword } from '../../shared/utils/crypto.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    try {
      const hashedPassword = await hashPassword(createUserDto.password);
      const user = this.userRepository.create({
        ...createUserDto,
        passwordHash: hashedPassword,
      });
      const savedUser = await this.userRepository.save(user);
      return this.mapUserToResponse(savedUser);
    } catch (error) {
      if (error.code === '23505') {
        // Unique violation error code for PostgreSQL
        throw new ConflictException('Username or email already exists');
      }
      throw new Error(`User could not be created: ${error}`);
    }
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.userRepository.find({
      select: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
    });
    return users.map(this.mapUserToResponse);
  }

  async findOne(id: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.mapUserToResponse(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = this.userRepository.merge(user, updateUserDto);
    const savedUser = await this.userRepository.save(updatedUser);
    return this.mapUserToResponse(savedUser);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  private mapUserToResponse(user: User): Partial<User> {
    const { id, username, email, createdAt, updatedAt } = user;
    return { id, username, email, createdAt, updatedAt };
  }
}
