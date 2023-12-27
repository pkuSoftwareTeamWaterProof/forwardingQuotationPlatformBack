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
exports.Evaluation = void 0;
const order_entity_1 = require("../../order/entity/order.entity");
const typeorm_1 = require("typeorm");
let Evaluation = class Evaluation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Evaluation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => order_entity_1.Ordert, (order) => order.evaluation),
    __metadata("design:type", order_entity_1.Ordert)
], Evaluation.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Evaluation.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evaluation.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'CreateDate',
    }),
    __metadata("design:type", Date)
], Evaluation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'UpdateDate',
    }),
    __metadata("design:type", Date)
], Evaluation.prototype, "updatedAt", void 0);
Evaluation = __decorate([
    (0, typeorm_1.Entity)()
], Evaluation);
exports.Evaluation = Evaluation;
//# sourceMappingURL=evaluation.entity.js.map