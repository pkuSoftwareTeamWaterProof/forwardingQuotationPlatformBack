"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const firm_entity_1 = require("./entity/firm.entity");
let UserService = class UserService {
    constructor(firmRepository, userRepository) {
        this.firmRepository = firmRepository;
        this.userRepository = userRepository;
    }
    async createFirm(createFirmDTO) {
        if ((await this.getFirmByName(createFirmDTO.name)) != null) {
            console.warn('A duplicate firm name: ', createFirmDTO.name);
            return;
        }
        const firm = new firm_entity_1.Firm();
        firm.name = createFirmDTO.name;
        firm.description = createFirmDTO.description;
        this.firmRepository.insert(firm);
    }
    async createUser(createUserDTO) {
        const existingUser = await this.getUserByName(createUserDTO.username);
        if (existingUser)
            throw new common_1.ConflictException();
        const user = new user_entity_1.User();
        user.username = createUserDTO.username;
        user.password = createUserDTO.password;
        user.role = createUserDTO.role;
        user.telephone = createUserDTO.telephone;
        user.email = createUserDTO.email;
        await this.userRepository.save(user);
        return;
    }
    async getFrimById(firmId) {
        const firm = await this.firmRepository.findOneBy({ id: firmId });
        return firm;
    }
    async getFirmByName(firmName) {
        const firm = await this.firmRepository.findOneBy({ name: firmName });
        return firm;
    }
    async getAllUsers() {
        return await this.userRepository.find();
    }
    async getUserById(userId, userRole = undefined) {
        const select_tag = { id: userId };
        if (userRole !== undefined) {
            select_tag['role'] = userRole;
        }
        const user = await this.userRepository.findOneBy(select_tag);
        return user;
    }
    async getUserByName(userName, userRole = undefined) {
        const select_tag = { username: userName };
        if (userRole !== undefined) {
            select_tag['role'] = userRole;
        }
        const user = await this.userRepository.findOneBy(select_tag);
        return user;
    }
    async getAllFirms() {
        const firms = await this.firmRepository.find();
        return firms;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(firm_entity_1.Firm)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map