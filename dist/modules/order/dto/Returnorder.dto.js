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
exports.ReturnOrderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class ReturnOrderDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'id',
        example: 100,
    }),
    __metadata("design:type", String)
], ReturnOrderDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '询价单id',
        example: 100,
    }),
    __metadata("design:type", String)
], ReturnOrderDTO.prototype, "sheetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '报价单id',
        example: 200,
    }),
    __metadata("design:type", String)
], ReturnOrderDTO.prototype, "answerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '内容',
        example: '成交',
    }),
    __metadata("design:type", String)
], ReturnOrderDTO.prototype, "context", void 0);
exports.ReturnOrderDTO = ReturnOrderDTO;
//# sourceMappingURL=Returnorder.dto.js.map