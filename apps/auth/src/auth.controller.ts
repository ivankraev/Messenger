import { Controller, Get } from '@nestjs/common';
import { MessagePattern, RmqContext } from '@nestjs/microservices';
import { Ctx } from '@nestjs/microservices/decorators';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return { user: 'USER' };
  }
}
