import { ApiProperty } from '@nestjs/swagger';

export class CreateFirmDTO{
  @ApiProperty({
    description: 'firmname',
    example: 'PacKing Union'
  })
  name: string;

  @ApiProperty({
    description: 'description',
    example: 'A company for freight forwarding.'
  })
  description: string|null;
}

export abstract class CreateUserDTO{
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
    description: 'type',
    example: 'administrator'
  })
  type: 'administrator'|'customer'|'forwarder';
}

export class CreateAdministratorDTO extends CreateUserDTO {
  @ApiProperty({
    description: 'type',
    example: 'administrator'
  })
  type: 'administrator';
}

export class CreateCustomerDTO extends CreateUserDTO{
  @ApiProperty({
    description: 'type',
    example: 'customer'
  })
  type: 'customer';

  @ApiProperty({
    description: 'telephone',
    example: '18501347653'
  })
  telephone: string | null

  @ApiProperty({
    description: 'email',
    example: 'test@myemail.com'
  })
  email: string | null
}

export class CreateForwarderDTO extends CreateUserDTO {
  @ApiProperty({
    description: 'type',
    example: 'forwarder'
  })
  type: 'forwarder';

  @ApiProperty({
    description: 'telephone',
    example: '18501347653'
  })
  telephone: string | null

  @ApiProperty({
    description: 'email',
    example: 'test@myemail.com'
  })
  email: string | null

  @ApiProperty({
    description: 'firm',
    example: '1234567890'
  })
  firm: string
}