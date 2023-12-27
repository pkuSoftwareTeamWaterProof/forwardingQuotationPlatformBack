"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const answer_entity_1 = require("./entity/answer.entity");
const answer_controller_1 = require("./answer.controller");
const answer_service_1 = require("./answer.service");
const sheet_service_1 = require("../sheet/sheet.service");
const sheet_entity_1 = require("../sheet/entity/sheet.entity");
const user_module_1 = require("../user/user.module");
let AnswerModule = class AnswerModule {
};
AnswerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([answer_entity_1.Answer]),
            typeorm_1.TypeOrmModule.forFeature([sheet_entity_1.Sheet]),
            user_module_1.UserModule,
        ],
        controllers: [answer_controller_1.AnswerController],
        providers: [answer_service_1.AnswerService, sheet_service_1.SheetService],
    })
], AnswerModule);
exports.AnswerModule = AnswerModule;
//# sourceMappingURL=answer.module.js.map