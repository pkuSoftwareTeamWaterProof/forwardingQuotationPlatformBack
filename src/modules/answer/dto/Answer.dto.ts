import { ApiProperty } from '@nestjs/swagger';

export class AnswerDTO {
  @ApiProperty({
    description: '报价单ID',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  id: string;

  @ApiProperty({
    description: '备注',
    example: '多加钱',
  })
  remark: string;

  /*
  @ApiProperty({
    description: '询价单ID',
    example: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy',
  })
  sheetID: string;
  */

  @ApiProperty({
    description: '创建时间',
    example: '2023-11-27 21:33:45',
  })
  createdAt: Date;

  @ApiProperty({
    description: '更新时间',
    example: '2023-11-27 21:34:45',
  })
  updateAt: Date;
}
