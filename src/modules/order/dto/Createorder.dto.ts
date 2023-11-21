import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {

  @ApiProperty({
    description: '询价单id',
    example: 100,
  })
  sheetid: string;

  @ApiProperty({
    description: '报价单id',
    example: 200,
  })
  answerid: string;

  @ApiProperty({
    description: '内容',
    example: '成交',
  })
  context: string;
 
}
