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
exports.AnswerDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class AnswerDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '报价单ID',
        example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    }),
    __metadata("design:type", String)
], AnswerDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '备注',
        example: '多加钱',
    }),
    __metadata("design:type", String)
], AnswerDTO.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '价格',
        example: '100',
    }),
    __metadata("design:type", Number)
], AnswerDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '询价单ID',
        example: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy',
    }),
    __metadata("design:type", String)
], AnswerDTO.prototype, "sheetID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '创建时间',
        example: '2023-11-27 21:33:45',
    }),
    __metadata("design:type", Date)
], AnswerDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '更新时间',
        example: '2023-11-27 21:34:45',
    }),
    __metadata("design:type", Date)
], AnswerDTO.prototype, "updateAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '货代ID',
        example: 'zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz',
    }),
    __metadata("design:type", String)
], AnswerDTO.prototype, "forwarderID", void 0);
exports.AnswerDTO = AnswerDTO;
//# sourceMappingURL=Answer.dto.js.map