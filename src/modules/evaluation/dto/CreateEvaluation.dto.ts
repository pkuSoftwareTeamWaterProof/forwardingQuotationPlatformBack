import { ApiProperty } from '@nestjs/swagger';

export abstract class CreateEvaluationDTO {
  @ApiProperty({
    description: '订单ID',
  })
  orderId: string;

  @ApiProperty({
    description: '分数',
    example: 3,
  })
  score: EvaluationScore;

  @ApiProperty({
    description: '评论',
    example: '完成了我的订单',
  })
  comment: string;
}
