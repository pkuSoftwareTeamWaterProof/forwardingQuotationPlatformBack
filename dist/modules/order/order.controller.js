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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const Createorder_dto_1 = require("./dto/Createorder.dto");
const Returnorder_dto_1 = require("./dto/Returnorder.dto");
const order_service_1 = require("./order.service");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../decorators/public.decorator");
let OrderController = class OrderController {
    constructor(orderservice) {
        this.orderservice = orderservice;
    }
    ordertToDTO(order) {
        var sheetID = undefined;
        var answerID = undefined;
        if (order['sheet'] === null) {
            console.error('Warning: An answer without a sheet');
            sheetID = null;
        }
        else {
            sheetID = order.sheet.id;
        }
        if (order['answer'] === null) {
            console.error('Warning: An answer without a forwarder');
            answerID = null;
        }
        else {
            answerID = order.answer.id;
        }
        const dto = {
            id: order.id,
            context: order.context,
            sheetId: sheetID,
            answerId: answerID,
        };
        return dto;
    }
    async createOrder(CreateOrderDTO) {
        await this.orderservice.createOrder(CreateOrderDTO);
        return;
    }
    async getOrderByorderId(orderid) {
        const order = await this.orderservice.getOrderById(orderid);
        return this.ordertToDTO(order);
    }
    async getOrderBysheetId(sheetid) {
        const order = await this.orderservice.getOrderBySheetId(sheetid);
        if (order === null) {
            const sheet = await this.orderservice.findsheet.getSheetById(sheetid);
            if (sheet === null) {
                throw new common_1.BadRequestException('Unknown sheet');
            }
            return null;
        }
        return this.ordertToDTO(order);
    }
    async getOrderBycustomerId(customerid) {
        const order = await this.orderservice.getOrderBycustomerId(customerid);
        return order.map(this.ordertToDTO);
    }
    async getOrderByanswerId(answerid) {
        const order = await this.orderservice.getOrderByanswerId(answerid);
        if (order === null) {
            const answer = await this.orderservice.findanswer.getAnswerByAnswerId(answerid);
            if (answer === null) {
                throw new common_1.BadRequestException('Unknown answer');
            }
            return null;
        }
        return this.ordertToDTO(order);
    }
    async getOrderByforwarderId(forwardid) {
        const order = await this.orderservice.getOrderByForwarderId(forwardid);
        return order.map(this.ordertToDTO);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Createorder_dto_1.CreateOrderDTO]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('orderid/:orderID'),
    (0, swagger_1.ApiOkResponse)({
        description: '返回orderid对应的表单-列表',
        type: Returnorder_dto_1.ReturnOrderDTO,
    }),
    __param(0, (0, common_1.Param)('orderID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderByorderId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('sheetid/:sheetID'),
    (0, swagger_1.ApiOkResponse)({
        description: '返回sheetid对应的表单-列表',
        type: Returnorder_dto_1.ReturnOrderDTO,
    }),
    __param(0, (0, common_1.Param)('sheetID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderBysheetId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('cusromerid/:customerID'),
    (0, swagger_1.ApiOkResponse)({
        description: '返回customerid对应的表单-列表',
        type: Returnorder_dto_1.ReturnOrderDTO,
    }),
    __param(0, (0, common_1.Param)('customerID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderBycustomerId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('answerid/:answerID'),
    (0, swagger_1.ApiOkResponse)({
        description: '返回answerid对应的表单-列表',
        type: Returnorder_dto_1.ReturnOrderDTO,
    }),
    __param(0, (0, common_1.Param)('answerID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderByanswerId", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('forwardid/:forwarderID'),
    (0, swagger_1.ApiOkResponse)({
        description: '返回forwardid对应的表单-列表',
        type: Returnorder_dto_1.ReturnOrderDTO,
    }),
    __param(0, (0, common_1.Param)('forwarderID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderByforwarderId", null);
OrderController = __decorate([
    (0, swagger_1.ApiTags)('api/order'),
    (0, common_1.Controller)('api/order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map