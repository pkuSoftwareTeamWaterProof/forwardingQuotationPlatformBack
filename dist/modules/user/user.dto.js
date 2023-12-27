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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateForwarderDTO = exports.CreateCustomerDTO = exports.CreateAdministratorDTO = exports.CreateUserDTO = exports.CreateFirmDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateFirmDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'firmname',
        example: 'PacKing Union',
    }),
    __metadata("design:type", String)
], CreateFirmDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'description',
        example: 'A company for freight forwarding.',
    }),
    __metadata("design:type", String)
], CreateFirmDTO.prototype, "description", void 0);
exports.CreateFirmDTO = CreateFirmDTO;
class CreateUserDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'username',
        example: 'laolee010126',
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'password',
        example: 'password123@',
        minLength: 6,
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'type',
        example: 'administrator',
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "type", void 0);
exports.CreateUserDTO = CreateUserDTO;
class CreateAdministratorDTO extends CreateUserDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'type',
        example: 'administrator',
    }),
    __metadata("design:type", String)
], CreateAdministratorDTO.prototype, "type", void 0);
exports.CreateAdministratorDTO = CreateAdministratorDTO;
class CreateCustomerDTO extends CreateUserDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'type',
        example: 'customer',
    }),
    __metadata("design:type", String)
], CreateCustomerDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'telephone',
        example: '18501347653',
    }),
    __metadata("design:type", String)
], CreateCustomerDTO.prototype, "telephone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'email',
        example: 'test@myemail.com',
    }),
    __metadata("design:type", String)
], CreateCustomerDTO.prototype, "email", void 0);
exports.CreateCustomerDTO = CreateCustomerDTO;
class CreateForwarderDTO extends CreateUserDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'type',
        example: 'forwarder',
    }),
    __metadata("design:type", String)
], CreateForwarderDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'telephone',
        example: '18501347653',
    }),
    __metadata("design:type", String)
], CreateForwarderDTO.prototype, "telephone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'email',
        example: 'test@myemail.com',
    }),
    __metadata("design:type", String)
], CreateForwarderDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'firm',
        example: '1234567890',
    }),
    __metadata("design:type", String)
], CreateForwarderDTO.prototype, "firm", void 0);
exports.CreateForwarderDTO = CreateForwarderDTO;
//# sourceMappingURL=user.dto.js.map