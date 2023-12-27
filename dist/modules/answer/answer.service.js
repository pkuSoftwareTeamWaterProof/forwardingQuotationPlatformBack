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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("./entity/answer.entity");
const sheet_service_1 = require("../sheet/sheet.service");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entity/user.entity");
let AnswerService = class AnswerService {
    constructor(findsheet, answerRepository, userService) {
        this.findsheet = findsheet;
        this.answerRepository = answerRepository;
        this.userService = userService;
    }
    async createAnswer(createAnswerDTO) {
        const answer = new answer_entity_1.Answer();
        const user = await this.userService.getUserById(createAnswerDTO.forwarderID, user_entity_1.UserRole.FORWARDER);
        if (user == null) {
            throw new common_1.BadRequestException('Unknown Forwarder');
        }
        answer.price = createAnswerDTO.price;
        answer.remark = createAnswerDTO.remark;
        const sheet = await this.findsheet.getSheetById(createAnswerDTO.Sheetid);
        if (sheet == null) {
            throw new common_1.BadRequestException('Unknown Sheet');
        }
        answer.sheet = sheet;
        answer.forwarder = user;
        await this.answerRepository.manager.save(answer);
    }
    async updateAnswer(Answerid, createAnswerDTO) {
        const answer = await this.answerRepository.findOneBy({ id: Answerid });
        answer.price = createAnswerDTO.price;
        answer.remark = createAnswerDTO.remark;
        const sheet = await this.findsheet.getSheetById(createAnswerDTO.Sheetid);
        answer.sheet = sheet;
        await this.answerRepository.manager.save(answer);
    }
    async deleteAnswer(Answerid) {
        await this.answerRepository.softDelete({ id: Answerid });
    }
    async getAnswerByAnswerId(Answerid) {
        const answer = await this.answerRepository.findOne({
            relations: ['sheet', 'forwarder'],
            where: { id: Answerid },
        });
        return answer;
    }
    async getAnswerBySheetId(sheetid) {
        const sheet = await this.findsheet.getSheetById(sheetid);
        if (sheet == null) {
            throw new common_1.BadRequestException('Unknown Sheet');
        }
        return this.answerRepository.find({
            relations: ['sheet', 'forwarder'],
            where: { sheet: { id: sheetid } },
        });
    }
    async getAnswersByUser(userID) {
        const user = await this.userService.getUserById(userID, user_entity_1.UserRole.FORWARDER);
        if (user == null) {
            throw new common_1.BadRequestException('Unknown User');
        }
        const answers = await this.answerRepository.find({
            relations: ['sheet', 'forwarder'],
            where: { forwarder: { id: userID } },
        });
        return answers;
    }
};
AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __metadata("design:paramtypes", [sheet_service_1.SheetService,
        typeorm_2.Repository,
        user_service_1.UserService])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map