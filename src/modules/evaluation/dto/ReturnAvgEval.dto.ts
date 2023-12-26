import { ApiProperty } from '@nestjs/swagger';

export class ReturnAvgEvalDTO {
  @ApiProperty({
    description:'avg-evaluation-score'
  })
  score: number|null
}