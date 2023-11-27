import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserDTO } from './dto/User.dto';
import { User } from './entity/user.entity';
import { Firm } from './entity/firm.entity';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiCreatedResponse({ description: '生成user成功' })
  @ApiConflictResponse({ description: '已存在同样的用户名' })
  @Post('create')
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    await this.userService.createUser(createUserDTO);
    return;
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: '查询成功', type: UserDTO })
  @ApiNotFoundResponse({ description: '查询失败' })
  @Get('getByID/:userId')
  async getUserById(@Param('userId') userId: string): Promise<User> {
    const user = await this.userService.getUserById(userId);
    return user;
  }

  @ApiBearerAuth()
  @Get('getByName/:userName')
  async getUserByName(@Param('userName') userName: string): Promise<User> {
    const user = await this.userService.getUserByName(userName);
    return user;
  }

  //TODO: 查询自己的userData
  @ApiBearerAuth()
  @ApiOkResponse({})
  @Get('me')
  async getMyUserData(@Param('userId') userId: string): Promise<User> {
    const user = await this.userService.getUserById(userId);
    return user;
  }
}

//TODO: firm分离出来
@ApiTags('firm')
@Controller('api/firm')
export class FirmController {
  constructor(private readonly userService: UserService) {}

  // @Post('create')
  // async createFirm(@Body() createFirmDTO: CreateFirmDTO): Promise<void> {
  //   await this.userService.createFirm(createFirmDTO);
  //   return;
  // }

  @Get('getById/:firmId')
  async getFirmById(@Param('firmId') firmId: string): Promise<Firm> {
    const firm = await this.userService.getFrimById(firmId);
    return firm;
  }

  @Get('getByName/:firmName')
  async getFirmByName(@Param('firmName') firmName: string): Promise<Firm> {
    const firm = await this.userService.getFirmByName(firmName);
    return firm;
  }

  @Get('list')
  async getAllFirms(): Promise<Array<Firm>> {
    const firms = await this.userService.getAllFirms();
    return firms;
  }
}
