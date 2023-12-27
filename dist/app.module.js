"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./modules/user/user.module");
const sheet_module_1 = require("./modules/sheet/sheet.module");
const answer_module_1 = require("./modules/answer/answer.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_entity_1 = require("./modules/user/entity/user.entity");
const firm_entity_1 = require("./modules/user/entity/firm.entity");
const order_entity_1 = require("./modules/order/entity/order.entity");
const answer_entity_1 = require("./modules/answer/entity/answer.entity");
const sheet_entity_1 = require("./modules/sheet/entity/sheet.entity");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./guard/auth.guard");
const order_module_1 = require("./modules/order/order.module");
const evaluation_module_1 = require("./modules/evaluation/evaluation.module");
const evaluation_entity_1 = require("./modules/evaluation/entity/evaluation.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [firm_entity_1.Firm, sheet_entity_1.Sheet, answer_entity_1.Answer, user_entity_1.User, order_entity_1.Ordert, evaluation_entity_1.Evaluation],
                synchronize: false,
                logging: false,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            sheet_module_1.SheetModule,
            answer_module_1.AnswerModule,
            order_module_1.OrderModule,
            evaluation_module_1.EvaluationModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map