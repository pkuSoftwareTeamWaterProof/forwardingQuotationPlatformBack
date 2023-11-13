import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'username',
    example: 'laolee010126',
  })
  username: string;

  @ApiProperty({
    description: 'password',
    example: 'password123@',
    minLength: 6,
  })
  password: string;

  
}
