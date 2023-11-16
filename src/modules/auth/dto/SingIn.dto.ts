import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty({
    description: '账号',
    example: 'laolee010126',
  })
  username: string;

  @ApiProperty({
    description: '密码',
    example: 'pass',
  })
  password: string;
}
