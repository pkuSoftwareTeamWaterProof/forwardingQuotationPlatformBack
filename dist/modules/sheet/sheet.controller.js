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
exports.SheetController = void 0;
const common_1 = require("@nestjs/common");
const createSheet_dto_1 = require("./dto/createSheet.dto");
const sheet_service_1 = require("./sheet.service");
const swagger_1 = require("@nestjs/swagger");
const ReturnSheet_dto_1 = require("./dto/ReturnSheet.dto");
const public_decorator_1 = require("../../decorators/public.decorator");
const common_2 = require("@nestjs/common");
let SheetController = class SheetController {
    constructor(sheetservice) {
        this.sheetservice = sheetservice;
    }
    async createSheet(createSheetDTO) {
        await this.sheetservice.createSheet(createSheetDTO);
        return;
    }
    async updateSheet(sheetid, createSheetDTO) {
        await this.sheetservice.updateSheet(sheetid, createSheetDTO);
        return;
    }
    async deleteSheet(sheetid) {
        await this.sheetservice.deleteSheet(sheetid);
        return;
    }
    async getAllSheet() {
        return await this.sheetservice.findAll();
    }
    async selectSheet(startpoint, endpoint) {
        return this.sheetservice.Select(startpoint, endpoint);
    }
    async getSheetById(sheetid) {
        const sheet = await this.sheetservice.getSheetById(sheetid);
        if (sheet === null) {
            throw new common_2.BadRequestException('Unknown Sheet ID');
        }
        return sheet;
    }
    async getSheetsByUser(customerID) {
        const sheets = this.sheetservice.getSheetsByUser(customerID);
        return sheets;
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '创建询价单' }),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSheet_dto_1.CreateSheetDTO]),
    __metadata("design:returntype", Promise)
], SheetController.prototype, "createSheet", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '更新询价单' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createSheet_dto_1.CreateSheetDTO]),
    __metadata("design:returntype", Promise)
], SheetController.prototype, "updateSheet", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '删除询价单' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SheetController.prototype, "deleteSheet", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '查询全部询价单' }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: '返回全部表单-列表', type: ReturnSheet_dto_1.ReturnSheetDTO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SheetController.prototype, "getAllSheet", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '查询符合条件的询价单' }),
    (0, common_1.Get)('select/:startpoint/:endpoint'),
    (0, swagger_1.ApiOkResponse)({ description: '返回相应条件表单-列表', type: ReturnSheet_dto_1.ReturnSheetDTO }),
    __param(0, (0, common_1.Param)('startpoint')),
    __param(1, (0, common_1.Param)('endpoint')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SheetController.prototype, "selectSheet", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '从ID查询询价单' }),
    (0, common_1.Get)(':sheetId'),
    (0, swagger_1.ApiOkResponse)({ description: '返回ID对应的表单', type: ReturnSheet_dto_1.ReturnSheetDTO }),
    __param(0, (0, common_1.Param)('sheetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SheetController.prototype, "getSheetById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '查询货主的询价单' }),
    (0, common_1.Get)('list/:customerID'),
    (0, swagger_1.ApiOkResponse)({
        description: '返回货主的表单-列表',
        type: ReturnSheet_dto_1.ReturnSheetDTO,
    }),
    __param(0, (0, common_1.Param)('customerID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SheetController.prototype, "getSheetsByUser", null);
SheetController = __decorate([
    (0, swagger_1.ApiTags)('询价单管理'),
    (0, common_1.Controller)('api/sheet'),
    __metadata("design:paramtypes", [sheet_service_1.SheetService])
], SheetController);
exports.SheetController = SheetController;
//# sourceMappingURL=sheet.controller.js.map