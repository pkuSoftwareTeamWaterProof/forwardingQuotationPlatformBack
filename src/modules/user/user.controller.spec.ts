import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRole } from './entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Firm } from './entity/firm.entity';
import { User } from './entity/user.entity';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userRepository: User[] = [];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Firm),
          useValue: null,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn((user: User) => {
              userRepository.push(user);
            }),
            findOneBy: jest.fn((opts: FindOptionsWhere<User>) => {
              for (const user of userRepository) {
                let flag: boolean = true;
                for (const key in opts) {
                  if (opts[key] != user[key]) {
                    flag = false;
                    break;
                  }
                }
                if (flag) {
                  return user;
                }
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    userRepository = [];
  });

  const createUserData: CreateUserDTO = {
    username: 'testcustomer',
    password: 'password123@',
    role: UserRole.CUSTOMER,
    telephone: '12345678901',
    email: '1@1',
  };

  const testuser: User = {
    id: '0',
    username: 'testcustomer',
    password: 'password123@',
    role: UserRole.CUSTOMER,
    telephone: '12345678901',
    email: '1@1',
    firm: null,
    answers: [],
    sheets: [],
    createdAt: null,
    updatedAt: null,
  };

  describe('createUser', () => {
    it('create an user with duplicate name, it should reject', async () => {
      await userController.createUser(createUserData);
      let hasThrown: boolean = false;
      try {
        await userController.createUser({
          username: 'testcustomer',
          password: 'pas7653',
          role: UserRole.FORWARDER,
          telephone: '12345678902',
          email: '1@2',
        });
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(HttpStatus.CONFLICT);
      }
      expect(hasThrown).toBe(true);
    });
  });

  describe('getUserByName', () => {
    it('find a user with name, if exists it should return the user', async () => {
      userRepository.push(testuser);
      expect(
        (await userController.getUserByName('testcustomer'))
      ).not.toBe(null);
    });
    it('otherwise it would reject', async () => {
      userRepository.push(testuser);
      let hasThrown: boolean = false;
      try {
        await userController.getUserByName('1000');
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect((error as HttpException).getResponse()['message']).toBe(
          '没有找到用户信息'
        );
      }
      expect(hasThrown).toBe(true);
    });
  });

  describe('getUserById', () => {
    it('find a user with id, if exists it should return the user', async () => {
      userRepository.push(testuser);
      expect(
        (await userController.getUserById('0'))
      ).not.toBe(null);
    });
    it('otherwise it would reject', async () => {
      userRepository.push(testuser);
      let hasThrown: boolean = false;
      try {
        await userController.getUserById('1000');
      } catch (error) {
        hasThrown = true;
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect((error as HttpException).getResponse()['message']).toBe(
          '没有找到用户信息'
        );
      }
      expect(hasThrown).toBe(true);
    });
  });
});
