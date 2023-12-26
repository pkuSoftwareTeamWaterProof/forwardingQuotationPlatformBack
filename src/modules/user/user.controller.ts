import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';
import { NotFoundException } from '@nestjs/common';

@ApiTags('用户管理')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Public()
  @ApiOperation({ summary: '用户注册' })
  @ApiCreatedResponse({ description: '生成user成功' })
  @ApiConflictResponse({ description: '已存在同样的用户名' })
  @Post('create')
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    await this.userService.createUser(createUserDTO);
    return;
  }

  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: '主键查询' })
  @ApiOkResponse({ description: '查询成功', type: UserDTO })
  @ApiNotFoundResponse({ description: '查询失败' })
  @Get('getByID/:userId')
  async getUserById(@Param('userId') userId: string): Promise<User|never> {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException('没有找到用户信息');
    return user;
  }

  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: '用户名查询' })
  @Get('getByName/:userName')
  async getUserByName(@Param('userName') userName: string): Promise<User|never> {
    const user = await this.userService.getUserByName(userName);
    if (user == null) throw new NotFoundException('没有找到用户信息');
    return user;
  }

  //TODO: 查询自己的userData
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: '查询自己的userData' })
  @ApiOkResponse({})
  @Get('me')
  async getMyUserData(@Param('userId') userId: string): Promise<User|never> {
    const user = await this.userService.getUserById(userId);
    if (user === null) throw new BadRequestException('Unknown User');
    return user;
  }

  //查询所有用户
  @Public()
  @ApiBearerAuth()
  @ApiOperation({ summary: '查询所有用户' })
  @ApiOkResponse({})
  @Get('list')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userService.getAllUsers();
  }
}

//TODO: firm分离出来
@Public()
@ApiTags('公司管理')
@Controller('api/firm')
export class FirmController {
  constructor(private readonly userService: UserService) {
  }

  // @Post('create')
  // async createFirm(@Body() createFirmDTO: CreateFirmDTO): Promise<void> {
  //   await this.userService.createFirm(createFirmDTO);
  //   return;
  // }
  @Public()
  @ApiOperation({ summary: '主键查询' })
  @Get('getById/:firmId')
  async getFirmById(@Param('firmId') firmId: string): Promise<Firm> {
    return await this.userService.getFrimById(firmId);
  }

  @Public()
  @ApiOperation({ summary: '公司名查询' })
  @Get('getByName/:firmName')
  async getFirmByName(@Param('firmName') firmName: string): Promise<Firm> {
    return await this.userService.getFirmByName(firmName);
  }

  @Public()
  @ApiOperation({ summary: '所有' })
  @Get('list')
  async getAllFirms(): Promise<Array<Firm>> {
    return await this.userService.getAllFirms();
  }
}
