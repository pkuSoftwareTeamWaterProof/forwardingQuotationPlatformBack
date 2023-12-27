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
exports.EvaluationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const evaluation_service_1 = require("./evaluation.service");
const public_decorator_1 = require("../../decorators/public.decorator");
const CreateEvaluation_dto_1 = require("./dto/CreateEvaluation.dto");
const ReturnEvaluation_dto_1 = require("./dto/ReturnEvaluation.dto");
const ReturnAvgEval_dto_1 = require("./dto/ReturnAvgEval.dto");
let EvaluationController = class EvaluationController {
    constructor(service) {
        this.service = service;
    }
    evaluationWrapper(entry) {
        const res = new ReturnEvaluation_dto_1.ReturnEvaluationDTO();
        res.id = entry.id;
        res.score = entry.score;
        res.comment = entry.comment;
        res.createdAt = entry.createdAt;
        return res;
    }
    async createEvaluation(dto) {
        const res = await this.service.createEvaluation(dto);
        if (!res.success) {
            throw new common_1.BadRequestException(res.cause);
        }
    }
    async deleteEvaluation(evalId) {
        await this.service.deleteEvaluation(evalId);
        return;
    }
    async getEvaluationById(evalId) {
        const entry = await this.service.getEvaluationById(evalId);
        if (entry === null) {
            throw new common_1.NotFoundException('Unknown evaluation id');
        }
        return this.evaluationWrapper(entry);
    }
    async getEvaluationByOrderId(orderId) {
        const entry = await this.service.getEvaluationByOrderId(orderId);
        if (entry === undefined) {
            throw new common_1.NotFoundException('Unknown order id, or an uncomplete order');
        }
        else if (entry === null) {
            return null;
        }
        return this.evaluationWrapper(entry);
    }
    async getEvaluationsByForwarderId(forwarderId) {
        const evals = await this.service.getEvaluationsByForwarderId(forwarderId);
        return evals.map(this.evaluationWrapper);
    }
    async getAvgEvalOfForwarder(forwarderId) {
        return { score: await this.service.getAvgEvalOfForwarder(forwarderId) };
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '创建评分' }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateEvaluation_dto_1.CreateEvaluationDTO]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "createEvaluation", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '删除评分' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "deleteEvaluation", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '从ID查询评价' }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: '返回相应评价', type: ReturnEvaluation_dto_1.ReturnEvaluationDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "getEvaluationById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '从订单查询评价' }),
    (0, common_1.Get)('order/:id'),
    (0, swagger_1.ApiOkResponse)({ description: '返回相应评价', type: ReturnEvaluation_dto_1.ReturnEvaluationDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "getEvaluationByOrderId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '从货代查询评价列表' }),
    (0, common_1.Get)('forwarder/:id'),
    (0, swagger_1.ApiOkResponse)({
        description: '返回相应评价列表',
        type: ReturnEvaluation_dto_1.ReturnEvaluationDTO,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "getEvaluationsByForwarderId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '从货代查询平均分' }),
    (0, common_1.Get)('forwarder_score/:id'),
    (0, swagger_1.ApiOkResponse)({ description: '返回相应评价平均分', type: ReturnAvgEval_dto_1.ReturnAvgEvalDTO }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluationController.prototype, "getAvgEvalOfForwarder", null);
EvaluationController = __decorate([
    (0, swagger_1.ApiTags)('评分管理'),
    (0, common_1.Controller)('api/evaluation'),
    __metadata("design:paramtypes", [evaluation_service_1.EvaluationService])
], EvaluationController);
exports.EvaluationController = EvaluationController;
//# sourceMappingURL=evaluation.controller.js.map