import { Controller, Get } from '@nestjs/common';
import { DOMAIN } from '@gogate/shared';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      ok: true,
      service: 'gogate-api',
      domain: DOMAIN,
      version: '0.1.0',
    };
  }
}
