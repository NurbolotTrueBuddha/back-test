import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example: 'asdfsaasdfsdg.asfasgasdf.faffasdfsaffsa',
    type: 'string',
    description: 'Временный Bearer-токен. Используйте его в защищенных роутах',
  })
  accessToken: string;
}
