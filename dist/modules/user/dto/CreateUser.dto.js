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
exports.CreateUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../entity/user.entity");
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
        type: 'enum',
        description: 'role',
        enum: user_entity_1.UserRole,
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'telephone',
        example: '18501347653',
        nullable: true,
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "telephone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'email',
        example: 'test@myemail.com',
        nullable: true,
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "email", void 0);
exports.CreateUserDTO = CreateUserDTO;
//# sourceMappingURL=CreateUser.dto.js.map