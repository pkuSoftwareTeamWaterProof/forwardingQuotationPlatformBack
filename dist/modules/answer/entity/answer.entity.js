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
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const sheet_entity_1 = require("../../sheet/entity/sheet.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const order_entity_1 = require("../../order/entity/order.entity");
let Answer = class Answer {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Answer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Answer.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Answer.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sheet_entity_1.Sheet, (sheet) => sheet.answer),
    __metadata("design:type", sheet_entity_1.Sheet)
], Answer.prototype, "sheet", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'CreateDate',
    }),
    __metadata("design:type", Date)
], Answer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'UpdateDate',
    }),
    __metadata("design:type", Date)
], Answer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.answers),
    __metadata("design:type", user_entity_1.User)
], Answer.prototype, "forwarder", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => order_entity_1.Ordert, (order) => order.answer),
    __metadata("design:type", order_entity_1.Ordert)
], Answer.prototype, "ordert", void 0);
Answer = __decorate([
    (0, typeorm_1.Entity)()
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=answer.entity.js.map