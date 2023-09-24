import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    await this.userService.createUser(createUserDTO);
    return;
  }

  @Get(':userId')
  getUserById(@Param() userId: string): Promise<User> {
    const user = this.userService.getUserById(userId);
    return user;
  }
}
