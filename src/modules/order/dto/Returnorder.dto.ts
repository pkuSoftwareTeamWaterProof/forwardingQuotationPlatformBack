import { ApiProperty } from '@nestjs/swagger';

export class ReturnOrderDTO {
  @ApiProperty({
    description: 'id',
    example: 100,
  })
  id: string;

  @ApiProperty({
    description: '询价单id',
    example: 100,
  })
  sheetId: string;

  @ApiProperty({
    description: '报价单id',
    example: 200,
  })
  answerId: string;

  @ApiProperty({
    description: '内容',
    example: '成交',
  })
  context: string;
}
