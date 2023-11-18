import { ApiProperty } from '@nestjs/swagger';

export class CreateSheetDTO {
  @ApiProperty({
    description: '起点',
    example: '中国北京',
  })
  startpoint: string;

  @ApiProperty({
    description: '终点',
    example: '美国华盛顿@',
    minLength: 6,
  })
  endpoint: string;

  @ApiProperty({
    description: '重量kg',
    example: 100,
  })
  weight: number;

  @ApiProperty({
    description: '尺寸m^3',
    example: 100,
  })
  size: number;

  @ApiProperty({
    description: '种类',
    example: '化妆品',
  })
  species: string;

  @ApiProperty({
    description: '运输方式',
    example: '海运@',
  })
  type_of_shipping: string;

  @ApiProperty({
    description: '备注',
    example: '加急加钱',
  })
  remark: string;

  @ApiProperty({
    description: '开始时间',
    example: '2023-11-13',
  })
  startdate: string;

  @ApiProperty({
    description: '结束时间',
    example: '2023-12-01',
  })
  enddate: string;

  @ApiProperty({
    description: 'Customer的UUID'
  })
  customerID: string;
}
