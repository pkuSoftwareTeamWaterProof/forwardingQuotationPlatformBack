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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const CreateAnswer_dto_1 = require("./dto/CreateAnswer.dto");
const answer_service_1 = require("./answer.service");
const swagger_1 = require("@nestjs/swagger");
const Answer_dto_1 = require("./dto/Answer.dto");
const public_decorator_1 = require("../../decorators/public.decorator");
let AnswerController = class AnswerController {
    constructor(answerservice) {
        this.answerservice = answerservice;
    }
    answerToDTO(answer) {
        var sheetID = undefined;
        var forwarderID = undefined;
        if (answer['sheet'] === null) {
            console.error('Warning: An answer without a sheet');
            sheetID = null;
        }
        else {
            sheetID = answer.sheet.id;
        }
        if (answer['forwarder'] === null) {
            console.error('Warning: An answer without a forwarder');
            forwarderID = null;
        }
        else {
            forwarderID = answer.forwarder.id;
        }
        const dto = {
            id: answer.id,
            price: answer.price,
            remark: answer.remark,
            sheetID: sheetID,
            createdAt: answer.createdAt,
            updateAt: answer.updatedAt,
            forwarderID: forwarderID,
        };
        return dto;
    }
    async createAnswer(createAnswerDTO) {
        await this.answerservice.createAnswer(createAnswerDTO);
        return;
    }
    async updateAnswer(answerid, createAnswerDTO) {
        await this.answerservice.updateAnswer(answerid, createAnswerDTO);
        return;
    }
    async deleteAnswer(answerid) {
        await this.answerservice.deleteAnswer(answerid);
        return;
    }
    async getAnswerByAnswerId(answerid) {
        const answer = await this.answerservice.getAnswerByAnswerId(answerid);
        if (answer === null) {
            throw new common_1.NotFoundException('Unknown Answer ID');
        }
        return this.answerToDTO(answer);
    }
    async getAnswerBySheetId(sheetid) {
        const answers = await this.answerservice.getAnswerBySheetId(sheetid);
        return answers.map(this.answerToDTO);
    }
    async getAnswersByUser(forwarderID) {
        const answers = await this.answerservice.getAnswersByUser(forwarderID);
        return answers.map(this.answerToDTO);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '创建报价单' }),
    (0, swagger_1.ApiCreatedResponse)({ description: '创建报价单成功' }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAnswer_dto_1.CreateAnswerDTO]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "createAnswer", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '修改报价单' }),
    (0, swagger_1.ApiOkResponse)({ description: '修改报价单成功' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateAnswer_dto_1.CreateAnswerDTO]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "updateAnswer", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '删除报价单' }),
    (0, swagger_1.ApiOkResponse)({ description: '删除报价单成功' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "deleteAnswer", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '主键查询' }),
    (0, swagger_1.ApiOkResponse)({
        description: '返回报价单ID对应的报价单',
        type: Answer_dto_1.AnswerDTO,
    }),
    (0, common_1.Get)(':answerID'),
    __param(0, (0, common_1.Param)('answerID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAnswerByAnswerId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '查询该询价单的所有报价单' }),
    (0, swagger_1.ApiOkResponse)({
        description: '返回该询价单的所有报价单',
        type: Answer_dto_1.AnswerDTO,
        isArray: true,
    }),
    (0, common_1.Get)('sheet/:sheetID'),
    __param(0, (0, common_1.Param)('sheetID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAnswerBySheetId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '查询该货代的所有报价单' }),
    (0, swagger_1.ApiOkResponse)({
        description: '返回该货代的所有报价单',
        type: Answer_dto_1.AnswerDTO,
        isArray: true,
    }),
    (0, common_1.Get)('list/:forwarderID'),
    __param(0, (0, common_1.Param)('forwarderID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAnswersByUser", null);
AnswerController = __decorate([
    (0, swagger_1.ApiTags)('报价单管理'),
    (0, common_1.Controller)('api/answer'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map