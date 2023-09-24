import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const user = new User();
    user.username = createUserDTO.username;
    user.password = createUserDTO.password;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }
}
