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
exports.ReturnSheetDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class ReturnSheetDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'id',
        example: '10001',
    }),
    __metadata("design:type", String)
], ReturnSheetDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '起点',
        example: '中国北京',
    }),
    __metadata("design:type", String)
], ReturnSheetDTO.prototype, "startpoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '终点',
        example: '美国华盛顿',
        minLength: 6,
    }),
    __metadata("design:type", String)
], ReturnSheetDTO.prototype, "endpoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '重量kg',
        example: 100,
    }),
    __metadata("design:type", Number)
], ReturnSheetDTO.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '尺寸m^3',
        example: 100,
    }),
    __metadata("design:type", Number)
], ReturnSheetDTO.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '种类',
        example: '化妆品',
    }),
    __metadata("design:type", String)
], ReturnSheetDTO.prototype, "species", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '运输方式',
        example: '海运',
    }),
    __metadata("design:type", String)
], ReturnSheetDTO.prototype, "type_of_shipping", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '备注',
        example: '加急加钱',
    }),
    __metadata("design:type", String)
], ReturnSheetDTO.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '开始时间',
        example: '2023-11-13',
    }),
    __metadata("design:type", String)
], ReturnSheetDTO.prototype, "startdate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '结束时间',
        example: '2023-12-01',
    }),
    __metadata("design:type", String)
], ReturnSheetDTO.prototype, "enddate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '创建时间',
        example: '2023-12-01',
    }),
    __metadata("design:type", Date)
], ReturnSheetDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '更新时间',
        example: '2023-12-01',
    }),
    __metadata("design:type", Date)
], ReturnSheetDTO.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '删除时间',
        example: '2023-12-01',
    }),
    __metadata("design:type", Date)
], ReturnSheetDTO.prototype, "deleteddAt", void 0);
exports.ReturnSheetDTO = ReturnSheetDTO;
//# sourceMappingURL=ReturnSheet.dto.js.map