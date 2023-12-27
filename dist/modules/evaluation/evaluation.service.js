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
exports.EvaluationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_service_1 = require("../order/order.service");
const evaluation_entity_1 = require("./entity/evaluation.entity");
const typeorm_2 = require("typeorm");
let EvaluationService = class EvaluationService {
    constructor(evalRepository, orderService) {
        this.evalRepository = evalRepository;
        this.orderService = orderService;
    }
    async createEvaluation(dto) {
        const order = await this.orderService.getOrderById(dto.orderId);
        if (order === null) {
            return { success: false, cause: 'Unknown Order' };
        }
        const evaluation = new evaluation_entity_1.Evaluation();
        evaluation.score = dto.score;
        evaluation.comment = dto.comment;
        evaluation.order = order;
        await this.evalRepository.save(evaluation);
        return { success: true, cause: evaluation };
    }
    async deleteEvaluation(evalId) {
        const entry = await this.evalRepository.softDelete({ id: evalId });
    }
    async getEvaluationById(evalId) {
        const evaluation = await this.evalRepository.findOne({
            relations: ['ordert'],
            where: { id: evalId },
        });
        return evaluation;
    }
    async getEvaluationByOrderId(orderId) {
        const order = await this.orderService.getOrderById(orderId);
        if (order === null)
            return undefined;
        return order.evaluation;
    }
    async getEvaluationsByCustomerId(customerId) {
        const orders = await this.orderService.getOrderBycustomerId(customerId);
        return orders.map((order) => order.evaluation);
    }
    async getEvaluationsByForwarderId(forwarderId) {
        const orders = await this.orderService.getOrderByForwarderId(forwarderId);
        return orders.map((order) => order.evaluation).filter(entry => !(entry === null));
    }
    async getAvgEvalOfForwarder(forwarderId) {
        const evals = await this.getEvaluationsByForwarderId(forwarderId);
        if (evals.length === 0) {
            return null;
        }
        let sum = 0;
        evals.forEach((entry) => {
            sum += entry.score;
        });
        return sum / evals.length;
    }
};
EvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(evaluation_entity_1.Evaluation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        order_service_1.OrderService])
], EvaluationService);
exports.EvaluationService = EvaluationService;
//# sourceMappingURL=evaluation.service.js.map