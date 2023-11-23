import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Repository } from 'typeorm';
import {
  CreateCustomerDTO,
  CreateAdministratorDTO,
  CreateForwarderDTO,
  CreateFirmDTO,
} from './dto/user.dto';
import {
  User,
  Customer,
  Forwarder,
  Administrator,
  Firm,
  UserRole,
} from './entity/user.entity';

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
    private readonly administratorRepository: Repository<Administrator>
  ) {}

  async createFirm(createFirmDTO: CreateFirmDTO) {
    if ((await this.getFirmByName(createFirmDTO.name)) != null) {
      console.warn('A duplicate firm name: ', createFirmDTO.name);
      return;
    }
    const firm = new Firm();
    firm.name = createFirmDTO.name;
    firm.description = createFirmDTO.description;
    firm.employees = [];
    this.firmRepository.insert(firm);
  }

  async getFrimById(firmId: string): Promise<Firm> {
    const firm = await this.firmRepository.findOneBy({ id: firmId });
    return firm;
  }

  async getFirmByName(firmName: string): Promise<Firm> {
    const firm = await this.firmRepository.findOneBy({ name: firmName });
    return firm;
  }

  async createAdministrator(createAdministratorDTO: CreateAdministratorDTO) {
    if ((await this.getUserByName(createAdministratorDTO.username)) != null) {
      console.warn('A duplicate user name: ', createAdministratorDTO.username);
      return;
    }
    const user = new Administrator();
    user.username = createAdministratorDTO.username;
    user.password = createAdministratorDTO.password;
    this.administratorRepository.insert(user);
  }

  async createCustomer(createCustomerDTO: CreateCustomerDTO) {
    if ((await this.getUserByName(createCustomerDTO.username)) != null) {
      console.warn('A duplicate user name: ', createCustomerDTO.username);
      return;
    }
    const user = new Customer();
    user.username = createCustomerDTO.username;
    user.password = createCustomerDTO.password;
    user.telephone = createCustomerDTO.telephone;
    user.email = createCustomerDTO.email;
    this.customerRepository.insert(user);
  }

  async createForwarder(createForwarderDTO: CreateForwarderDTO) {
    if ((await this.getUserByName(createForwarderDTO.username)) != null) {
      console.warn('A duplicate user name: ', createForwarderDTO.username);
      return;
    }
    const user = new Forwarder();
    user.username = createForwarderDTO.username;
    user.password = createForwarderDTO.password;
    user.telephone = createForwarderDTO.telephone;
    user.email = createForwarderDTO.email;
    const firm: Firm = await this.getFrimById(createForwarderDTO.firm);
    user.firm = firm;
    this.forwarderRepository.insert(user);
  }

  async getUserById(userId: string, role?: UserRole): Promise<User> {
    switch (role) {
      case UserRole.CUSTOMER: {
        const user = await this.customerRepository.findOneBy({ id: userId });
        return user;
      }
      case UserRole.FORWARDER: {
        const user = await this.forwarderRepository.findOneBy({ id: userId });
        return user;
      }
      case UserRole.ADMINISTRATOR: {
        const user = await this.administratorRepository.findOneBy({
          id: userId,
        });
        return user;
      }
      default: {
        const user = await this.customerRepository
          .findOneByOrFail({ id: userId })
          .catch((error) =>
            this.forwarderRepository
              .findOneByOrFail({ id: userId })
              .catch((error) =>
                this.administratorRepository.findOneBy({ id: userId })
              )
          );
        return user;
      }
    }
  }

  async getUserByName(userName: string): Promise<User> {
    const user = await this.customerRepository
      .findOneByOrFail({ username: userName })
      .catch((error) =>
        this.forwarderRepository
          .findOneByOrFail({ username: userName })
          .catch((error) =>
            this.administratorRepository.findOneBy({ username: userName })
          )
      );
    return user;
  }

  async getAllFirms(): Promise<Array<Firm>> {
    const firms = await this.firmRepository.find();
    return firms;
  }
}
