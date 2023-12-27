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
exports.Ordert = void 0;
const typeorm_1 = require("typeorm");
const sheet_entity_1 = require("../../sheet/entity/sheet.entity");
const answer_entity_1 = require("../../answer/entity/answer.entity");
const evaluation_entity_1 = require("../../evaluation/entity/evaluation.entity");
let Ordert = class Ordert {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ordert.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ordert.prototype, "context", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => sheet_entity_1.Sheet, (sheet) => sheet.ordert),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", sheet_entity_1.Sheet)
], Ordert.prototype, "sheet", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => answer_entity_1.Answer, (answer) => answer.ordert),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", answer_entity_1.Answer)
], Ordert.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'CreateDate',
    }),
    __metadata("design:type", Date)
], Ordert.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'UpdateDate',
    }),
    __metadata("design:type", Date)
], Ordert.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => evaluation_entity_1.Evaluation, (evaluation) => evaluation.order),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", evaluation_entity_1.Evaluation)
], Ordert.prototype, "evaluation", void 0);
Ordert = __decorate([
    (0, typeorm_1.Entity)()
], Ordert);
exports.Ordert = Ordert;
//# sourceMappingURL=order.entity.js.map