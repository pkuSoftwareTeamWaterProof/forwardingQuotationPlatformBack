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
exports.Administrator = exports.Forwarder = exports.Customer = exports.User = exports.UserRole = exports.Firm = void 0;
const typeorm_1 = require("typeorm");
const sheet_entity_1 = require("../sheet/entity/sheet.entity");
const answer_entity_1 = require("../answer/entity/answer.entity");
let Firm = class Firm {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Firm.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Firm.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Firm.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Firm.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], Firm.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => Forwarder, (forwarder) => forwarder.firm),
    __metadata("design:type", Array)
], Firm.prototype, "employees", void 0);
Firm = __decorate([
    (0, typeorm_1.Entity)()
], Firm);
exports.Firm = Firm;
var UserRole;
(function (UserRole) {
    UserRole["CUSTOMER"] = "customer";
    UserRole["FORWARDER"] = "forwarder";
    UserRole["ADMINISTRATOR"] = "administrator";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User {
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User;
let Customer = class Customer extends User {
    constructor() {
        super(...arguments);
        this.role = UserRole.CUSTOMER;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => sheet_entity_1.Sheet, sheet => sheet.customer),
    __metadata("design:type", Array)
], Customer.prototype, "sheets", void 0);
Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);
exports.Customer = Customer;
let Forwarder = class Forwarder extends User {
    constructor() {
        super(...arguments);
        this.role = UserRole.FORWARDER;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Forwarder.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Forwarder.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Firm, firm => firm.employees),
    __metadata("design:type", Firm)
], Forwarder.prototype, "firm", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => answer_entity_1.Answer, answer => answer.forwarder),
    __metadata("design:type", Array)
], Forwarder.prototype, "answers", void 0);
Forwarder = __decorate([
    (0, typeorm_1.Entity)()
], Forwarder);
exports.Forwarder = Forwarder;
let Administrator = class Administrator extends User {
    constructor() {
        super(...arguments);
        this.role = UserRole.ADMINISTRATOR;
    }
};
Administrator = __decorate([
    (0, typeorm_1.Entity)()
], Administrator);
exports.Administrator = Administrator;
//# sourceMappingURL=user.entity.js.map