import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { EvaluationService } from './evaluation.service';
import { Public } from 'src/decorators/public.decorator';
import { CreateEvaluationDTO } from './dto/CreateEvaluation.dto';
import { ReturnEvaluationDTO } from './dto/ReturnEvaluation.dto';
import { Evaluation } from './entity/evaluation.entity';

@ApiTags('评分管理')
@Controller('api/evaluation')
export class EvaluationController {
  constructor(private readonly service: EvaluationService) {}

  evaluationWrapper(entry: Evaluation): ReturnEvaluationDTO {
    const res = new ReturnEvaluationDTO();
    res.id = entry.id;
    res.score = entry.score;
    res.comment = entry.comment;
    res.orderId = entry.order === null ? null : entry.order.id;
    res.createdAt = entry.createdAt;
    return res;
  }

  @Public()
  @ApiOperation({ summary: '创建评分' })
  @Post('create')
  async createEvaluation(@Body() dto: CreateEvaluationDTO): Promise<void> {
    const res = await this.service.createEvaluation(dto);
    if (!res.success) {
      throw new BadRequestException(res.cause);
    }
  }

  @Public()
  @ApiOperation({ summary: '删除评分' })
  @Delete(':id')
  async deleteEvaluation(@Param('id') evalId: string): Promise<void> {
    await this.service.deleteEvaluation(evalId);
    return;
  }

  @Public()
  @ApiOperation({ summary: '从ID查询评价' })
  @Get(':id')
  @ApiOkResponse({ description: '返回相应评价', type: ReturnEvaluationDTO })
  async getEvaluationById(
    @Param('id') evalId: string
  ): Promise<ReturnEvaluationDTO> {
    const entry = await this.service.getEvaluationById(evalId);
    if (entry === null) {
      throw new NotFoundException('Unknown evaluation id');
    }
    return this.evaluationWrapper(entry);
  }

  @Public()
  @ApiOperation({ summary: '从订单查询评价' })
  @Get('order/:id')
  @ApiOkResponse({ description: '返回相应评价', type: ReturnEvaluationDTO })
  async getEvaluationByOrderId(
    @Param('id') orderId: string
  ): Promise<ReturnEvaluationDTO> {
    const entry = await this.service.getEvaluationByOrderId(orderId);
    if (entry === undefined) {
      throw new NotFoundException('Unknown order id, or an uncomplete order');
    } else if (entry === null) {
      return null;
    }
    return this.evaluationWrapper(entry);
  }

  @Public()
  @ApiOperation({ summary: '从货代查询评价列表' })
  @Get('forwarder/:id')
  @ApiOkResponse({
    description: '返回相应评价列表',
    type: ReturnEvaluationDTO,
    isArray: true,
  })
  async getEvaluationsByForwarderId(
    @Param('id') forwarderId: string
  ): Promise<Array<ReturnEvaluationDTO>> {
    return (await this.service.getEvaluationsByForwarderId(forwarderId)).map(
      this.evaluationWrapper
    );
  }

  @Public()
  @ApiOperation({ summary: '从货代查询平均分' })
  @Get('forwarder_score/:id')
  @ApiOkResponse({ description: '返回相应评价平均分', type: 'number' })
  async getAvgEvalOfForwarder(
    @Param('id') forwarderId: string
  ): Promise<number> {
    return await this.service.getAvgEvalOfForwarder(forwarderId);
  }
}
