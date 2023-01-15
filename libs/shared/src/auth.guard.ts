import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class AuthGuard {
  hasJwt() {
    return { jwt: 'token' };
  }
}
