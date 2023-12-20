import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('评分管理')
@Controller('api/evaluation')
export class EvaluationController {}
