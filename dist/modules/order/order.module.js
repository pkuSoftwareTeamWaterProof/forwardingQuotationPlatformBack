"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entity/order.entity");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const sheet_service_1 = require("../sheet/sheet.service");
const sheet_entity_1 = require("../sheet/entity/sheet.entity");
const answer_entity_1 = require("../answer/entity/answer.entity");
const answer_service_1 = require("../answer/answer.service");
const user_module_1 = require("../user/user.module");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Ordert]),
            typeorm_1.TypeOrmModule.forFeature([answer_entity_1.Answer]),
            typeorm_1.TypeOrmModule.forFeature([sheet_entity_1.Sheet]),
            user_module_1.UserModule,
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, sheet_service_1.SheetService, answer_service_1.AnswerService],
        exports: [order_service_1.OrderService]
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map