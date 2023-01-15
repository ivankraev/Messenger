import { SharedService } from '@app/shared';
import { AuthGuard } from '@app/shared/auth.guard';
import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { PresenceService } from './presence.service';

@Controller()
export class PresenceController {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly sharedService: SharedService,
    private readonly authGuard: AuthGuard,
  ) {}

  @MessagePattern({ cmd: 'get-users' })
  async getPresence(@Ctx() context: RmqContext) {
    this.sharedService.acknoledgeMessage(context);

    return this.presenceService.getHello();
  }

  @MessagePattern({ cmd: 'post-user' })
  async postPresence(@Ctx() context: RmqContext) {
    this.sharedService.acknoledgeMessage(context);

    return this.presenceService.getHello();
  }
}
