import { ApiProperty } from '@nestjs/swagger';

export class CreateFirmDTO {
  @ApiProperty({
    description: 'firmname',
    example: 'PacKing Union',
  })
  name: string;

  @ApiProperty({
    description: 'description',
    example: 'A company for freight forwarding.',
  })
  description: string | null;
}
