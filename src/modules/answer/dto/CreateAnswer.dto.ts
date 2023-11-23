import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDTO {

  @ApiProperty({
    description: 'price',
    example: 100,
  })
  price: number;

  @ApiProperty({
    description: '备注',
    example: '要加钱',
  })
  remark: string;

  @ApiProperty({
    description: '订单id',
    example: '535',
  })
  Sheetid: string;

  @ApiProperty({
    description: '货代UUID'
  })
  forwarderID: string;
 
}
