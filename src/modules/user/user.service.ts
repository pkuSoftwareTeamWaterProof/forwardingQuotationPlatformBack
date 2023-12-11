import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { CreateFirmDTO } from './dto/CreateFirm.dto';
import { User, UserRole } from './entity/user.entity';
import { Firm } from './entity/firm.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Firm)
    private readonly firmRepository: Repository<Firm>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createFirm(createFirmDTO: CreateFirmDTO) {
    if ((await this.getFirmByName(createFirmDTO.name)) != null) {
      console.warn('A duplicate firm name: ', createFirmDTO.name);
      return;
    }
    const firm = new Firm();
    firm.name = createFirmDTO.name;
    firm.description = createFirmDTO.description;
    // firm.employees = [];
    this.firmRepository.insert(firm);
  }

  async createUser(createUserDTO: CreateUserDTO) {
    const existingUser = await this.getUserByName(createUserDTO.username);
    if (existingUser) throw new ConflictException();

    const user = new User();
    user.username = createUserDTO.username;
    user.password = createUserDTO.password;
    user.role = createUserDTO.role;
    user.telephone = createUserDTO.telephone;
    user.email = createUserDTO.email;
    await this.userRepository.save(user);
    return;
  }

  async getFrimById(firmId: string): Promise<Firm> {
    const firm = await this.firmRepository.findOneBy({ id: firmId });
    return firm;
  }

  async getFirmByName(firmName: string): Promise<Firm> {
    const firm = await this.firmRepository.findOneBy({ name: firmName });
    return firm;
  }

  async getUserById(userId: string, userRole: UserRole | undefined = undefined): Promise<User> {
    const select_tag={ id: userId };
    if(userRole !== undefined){
      select_tag["role"] = userRole;
    }
    const user = await this.userRepository.findOneBy(select_tag);
    if (!user) throw new NotFoundException('没有找到用户信息');
    return user;
  }

  async getUserByName(userName: string, userRole: UserRole | undefined = undefined): Promise<User | null> {
    const select_tag={ username: userName };
    if(userRole !== undefined){
      select_tag["role"] = userRole;
    }
    const user = await this.userRepository.findOneBy(select_tag);
    console.log(user);

    return user;
  }

  async getAllFirms(): Promise<Array<Firm>> {
    const firms = await this.firmRepository.find();
    return firms;
  }
}
