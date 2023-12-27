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
exports.Sheet = void 0;
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("../../answer/entity/answer.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const order_entity_1 = require("../../order/entity/order.entity");
let Sheet = class Sheet {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Sheet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sheet.prototype, "startpoint", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sheet.prototype, "endpoint", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sheet.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sheet.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sheet.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sheet.prototype, "type_of_shipping", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sheet.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sheet.prototype, "startdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sheet.prototype, "enddate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.Ordert, (order) => order.sheet),
    __metadata("design:type", order_entity_1.Ordert)
], Sheet.prototype, "ordert", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.Answer, (answer) => answer.sheet),
    __metadata("design:type", Array)
], Sheet.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'CreateDate',
    }),
    __metadata("design:type", Date)
], Sheet.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'UpdateDate',
    }),
    __metadata("design:type", Date)
], Sheet.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.sheets),
    __metadata("design:type", user_entity_1.User)
], Sheet.prototype, "customer", void 0);
Sheet = __decorate([
    (0, typeorm_1.Entity)()
], Sheet);
exports.Sheet = Sheet;
//# sourceMappingURL=sheet.entity.js.map