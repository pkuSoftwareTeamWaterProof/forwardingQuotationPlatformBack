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
exports.FirmController = exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const CreateUser_dto_1 = require("./dto/CreateUser.dto");
const User_dto_1 = require("./dto/User.dto");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../decorators/public.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserDTO) {
        await this.userService.createUser(createUserDTO);
        return;
    }
    async getUserById(userId) {
        const user = await this.userService.getUserById(userId);
        if (!user)
            throw new common_1.NotFoundException('没有找到用户信息');
        return user;
    }
    async getUserByName(userName) {
        const user = await this.userService.getUserByName(userName);
        if (user == null)
            throw new common_1.NotFoundException('没有找到用户信息');
        return user;
    }
    async getMyUserData(userId) {
        const user = await this.userService.getUserById(userId);
        if (user === null)
            throw new common_1.BadRequestException('Unknown User');
        return user;
    }
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '用户注册' }),
    (0, swagger_1.ApiCreatedResponse)({ description: '生成user成功' }),
    (0, swagger_1.ApiConflictResponse)({ description: '已存在同样的用户名' }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '主键查询' }),
    (0, swagger_1.ApiOkResponse)({ description: '查询成功', type: User_dto_1.UserDTO }),
    (0, swagger_1.ApiNotFoundResponse)({ description: '查询失败' }),
    (0, common_1.Get)('getByID/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '用户名查询' }),
    (0, common_1.Get)('getByName/:userName'),
    __param(0, (0, common_1.Param)('userName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByName", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '查询自己的userData' }),
    (0, swagger_1.ApiOkResponse)({}),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyUserData", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '查询所有用户' }),
    (0, swagger_1.ApiOkResponse)({}),
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('用户管理'),
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
let FirmController = class FirmController {
    constructor(userService) {
        this.userService = userService;
    }
    async getFirmById(firmId) {
        return await this.userService.getFrimById(firmId);
    }
    async getFirmByName(firmName) {
        return await this.userService.getFirmByName(firmName);
    }
    async getAllFirms() {
        return await this.userService.getAllFirms();
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '主键查询' }),
    (0, common_1.Get)('getById/:firmId'),
    __param(0, (0, common_1.Param)('firmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FirmController.prototype, "getFirmById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '公司名查询' }),
    (0, common_1.Get)('getByName/:firmName'),
    __param(0, (0, common_1.Param)('firmName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FirmController.prototype, "getFirmByName", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '所有' }),
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FirmController.prototype, "getAllFirms", null);
FirmController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiTags)('公司管理'),
    (0, common_1.Controller)('api/firm'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], FirmController);
exports.FirmController = FirmController;
//# sourceMappingURL=user.controller.js.map