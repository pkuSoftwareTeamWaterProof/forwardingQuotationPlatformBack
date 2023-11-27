import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entity/user.entity';

export abstract class CreateUserDTO {
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

  @ApiProperty({
    type: 'enum',
    description: 'role',
    enum: UserRole,
  })
  role: UserRole;

  @ApiProperty({
    description: 'telephone',
    example: '18501347653',
    nullable: true,
  })
  telephone: string | null;

  @ApiProperty({
    description: 'email',
    example: 'test@myemail.com',
    nullable: true,
  })
  email: string | null;
}
