import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import { CreateCustomerDTO, CreateAdministratorDTO, CreateForwarderDTO, CreateFirmDTO } from './user.dto';
import { User, Customer, Forwarder, Administrator, Firm } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Firm)
    private readonly firmRepository: Repository<Firm>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Forwarder)
    private readonly forwarderRepository: Repository<Forwarder>,
    @InjectRepository(Administrator)
    private readonly administratorRepository: Repository<Administrator>,
  ) {}

  async createFirm(createFirmDTO:CreateFirmDTO){
    const firm = new Firm();
    firm.name=createFirmDTO.name;
    firm.description=createFirmDTO.description;
    firm.employees=[]
    this.firmRepository.insert(firm);
  }

  async getFrimById(firmId: string): Promise<Firm> {
    const firm = await this.firmRepository.findOneBy({id: firmId});
    return firm;
  }

  async createAdministrator(createAdministratorDTO: CreateAdministratorDTO){
    const user = new Administrator();
    user.username = createAdministratorDTO.username;
    user.password = createAdministratorDTO.password;
    this.administratorRepository.insert(user);
  }

  async createCustomer(createCustomerDTO: CreateCustomerDTO) {
    const user = new Customer();
    user.username = createCustomerDTO.username;
    user.password = createCustomerDTO.password;
    user.telephone = createCustomerDTO.telephone;
    user.email = createCustomerDTO.email;
    this.customerRepository.insert(user);
  }

  async createForwarder(createForwarderDTO: CreateForwarderDTO){
    const user = new Forwarder();
    user.username = createForwarderDTO.username;
    user.password = createForwarderDTO.password;
    user.telephone = createForwarderDTO.telephone;
    user.email = createForwarderDTO.email;
    const firm : Firm = await this.getFrimById(createForwarderDTO.firm);
    user.firm = firm;
    this.forwarderRepository.insert(user);
  }

  async getUserById(userId: string): Promise<User> {
    console.log(userId);
    const user=await this.customerRepository
      .findOneByOrFail({ id: userId })
      .catch((error) => this.forwarderRepository.findOneByOrFail({id: userId}).catch((error) => this.administratorRepository.findOneByOrFail({id: userId})));
    return user;
  }
}
