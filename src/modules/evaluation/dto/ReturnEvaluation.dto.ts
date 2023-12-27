import { ApiProperty } from '@nestjs/swagger';

export class ReturnEvaluationDTO {
  @ApiProperty({
    description: 'id',
  })
  id: string;

  @ApiProperty({
    description: '评分',
    example: 4,
  })
  score: EvaluationScore;

  @ApiProperty({
    description: '评论',
    example: 'Good',
  })
  comment: string;

  @ApiProperty({
    description: '创建时间',
  })
  createdAt: Date | undefined;
}
