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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entity/order.entity");
const sheet_service_1 = require("../sheet/sheet.service");
const answer_service_1 = require("../answer/answer.service");
let OrderService = class OrderService {
    constructor(findsheet, findanswer, orderRepository) {
        this.findsheet = findsheet;
        this.findanswer = findanswer;
        this.orderRepository = orderRepository;
    }
    async createOrder(createOrderDTO) {
        const order = new order_entity_1.Ordert();
        order.context = createOrderDTO.context;
        const sheet = await this.findsheet.getSheetById(createOrderDTO.sheetid);
        if (sheet === null) {
            throw new common_1.BadRequestException('Unknown sheet');
        }
        const answer = await this.findanswer.getAnswerByAnswerId(createOrderDTO.answerid);
        if (answer === null) {
            throw new common_1.BadRequestException('Unknown answer');
        }
        if (JSON.stringify(answer.sheet) !== JSON.stringify(sheet)) {
            throw new common_1.BadRequestException('Unpaired answer and sheet');
        }
        order.sheet = sheet;
        order.answer = answer;
        await this.orderRepository.manager.save(order);
    }
    async getOrderById(Orderid) {
        const order = await this.orderRepository.findOne({
            relations: ['answer', 'sheet', 'evaluation'],
            where: { id: Orderid },
        });
        return order;
    }
    async getOrderBycustomerId(cusromerid) {
        const sheets = await this.findsheet.getSheetsByUser(cusromerid);
        var orders = new Array();
        for (let sheet of sheets) {
            const order = await this.orderRepository.find({
                relations: ['sheet', 'answer', 'evaluation'],
                where: { sheet: { id: sheet.id } },
            });
            if (order) {
                orders.push(...order);
            }
        }
        return orders;
    }
    async getOrderByForwarderId(forwarderId) {
        const answers = await this.findanswer.getAnswersByUser(forwarderId);
        var orders = new Array();
        for (let answer of answers) {
            const order = await this.orderRepository.find({
                relations: ['sheet', 'answer', 'evaluation'],
                where: { answer: { id: answer.id } },
            });
            if (order) {
                orders.push(...order);
            }
        }
        return orders;
    }
    async getOrderBySheetId(Sheetid) {
        const order = await this.orderRepository.findOne({
            relations: ['sheet', 'answer', 'evaluation'],
            where: { sheet: { id: Sheetid } },
        });
        return order;
    }
    async getOrderByanswerId(Answerid) {
        const order = await this.orderRepository.findOne({
            relations: ['sheet', 'answer', 'evaluation'],
            where: { answer: { id: Answerid } },
        });
        return order;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Ordert)),
    __metadata("design:paramtypes", [sheet_service_1.SheetService,
        answer_service_1.AnswerService,
        typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map