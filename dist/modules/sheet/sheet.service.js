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
exports.SheetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sheet_entity_1 = require("./entity/sheet.entity");
const user_entity_1 = require("../user/entity/user.entity");
const user_service_1 = require("../user/user.service");
let SheetService = class SheetService {
    constructor(sheetRepository, userService) {
        this.sheetRepository = sheetRepository;
        this.userService = userService;
    }
    async createSheet(createSheetDTO) {
        const sheet = new sheet_entity_1.Sheet();
        const userId = createSheetDTO.customerID;
        if (userId == null) {
            throw new common_1.BadRequestException('Unknown Customer');
        }
        const customer = await this.userService.getUserById(userId, user_entity_1.UserRole.CUSTOMER);
        if (customer == null) {
            throw new common_1.BadRequestException('Unknown Customer');
        }
        sheet.startpoint = createSheetDTO.startpoint;
        sheet.endpoint = createSheetDTO.endpoint;
        sheet.weight = createSheetDTO.weight;
        sheet.size = createSheetDTO.size;
        sheet.species = createSheetDTO.species;
        sheet.type_of_shipping = createSheetDTO.type_of_shipping;
        sheet.remark = createSheetDTO.remark;
        sheet.startdate = createSheetDTO.startdate;
        sheet.enddate = createSheetDTO.enddate;
        sheet.customer = customer;
        await this.sheetRepository.manager.save(sheet);
    }
    async updateSheet(Sheetid, createSheetDTO) {
        const sheet = await this.sheetRepository.findOneBy({ id: Sheetid });
        if (!sheet.answer) {
            sheet.startpoint = createSheetDTO.startpoint;
            sheet.endpoint = createSheetDTO.endpoint;
            sheet.weight = createSheetDTO.weight;
            sheet.size = createSheetDTO.size;
            sheet.species = createSheetDTO.species;
            sheet.type_of_shipping = createSheetDTO.type_of_shipping;
            sheet.remark = createSheetDTO.remark;
            sheet.startdate = createSheetDTO.startdate;
            sheet.enddate = createSheetDTO.enddate;
            await this.sheetRepository.manager.save(sheet);
        }
        else {
            throw new common_1.BadRequestException();
        }
    }
    async deleteSheet(Sheetid) {
        const sheet = await this.sheetRepository.softDelete({ id: Sheetid });
    }
    async findAll() {
        return this.sheetRepository.find();
    }
    async Select(startpoints, endpoints) {
        return this.sheetRepository.find({
            where: {
                startpoint: startpoints,
                endpoint: endpoints,
            },
        });
    }
    async getSheetById(Sheetid) {
        const sheet = await this.sheetRepository.findOne({
            where: { id: Sheetid },
        });
        return sheet;
    }
    async getSheetsByUser(userID) {
        const user = await this.userService.getUserById(userID, user_entity_1.UserRole.CUSTOMER);
        if (user == null) {
            throw new common_1.BadRequestException('Unknown User');
        }
        const sheets = await this.sheetRepository.find({
            relations: { customer: true },
            where: { customer: { id: userID } },
        });
        return sheets;
    }
};
SheetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sheet_entity_1.Sheet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], SheetService);
exports.SheetService = SheetService;
//# sourceMappingURL=sheet.service.js.map