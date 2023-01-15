import { Controller } from '@nestjs/common';
import { MessagePattern, RmqContext } from '@nestjs/microservices';
import { Ctx } from '@nestjs/microservices/decorators';
import { SharedService } from '@app/shared';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUsers(@Ctx() context: RmqContext) {
    this.sharedService.acknoledgeMessage(context);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Ctx() context: RmqContext) {
    this.sharedService.acknoledgeMessage(context);

    return this.authService.postUser();
  }
}
