import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCustomerDTO, CreateForwarderDTO, CreateAdministratorDTO, CreateUserDTO, CreateFirmDTO } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    switch(createUserDTO.type){
      case 'forwarder':
        await this.userService.createForwarder((createUserDTO as CreateForwarderDTO));
        break;
      case 'customer':
        await this.userService.createCustomer((createUserDTO as CreateCustomerDTO));
        break;
      case 'administrator':
        await this.userService.createAdministrator((createUserDTO as CreateAdministratorDTO));
        break;
      default:
        throw TypeError("Unknown user role: "+createUserDTO.type)
    }
    return;
  }

  
  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<User> {
    const user = await this.userService.getUserById(userId);
    return user;
  }
}

@ApiTags("firm")
@Controller("api/firm")
export class FirmController{
  constructor(private readonly userService: UserService) {}

  @Post()
  async createFirm(@Body() createFirmDTO:CreateFirmDTO): Promise<void>{
    await this.userService.createFirm(createFirmDTO);
    return;
  }
}
