import { Controller, All, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ProxyService } from './proxy.service';

@Controller('api-proxy')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @All('*')
  async proxy(@Req() req: Request): Promise<any> {
    const apiPath = req.originalUrl.replace('/api-proxy', '');
    return this.proxyService.proxyRequest(
      apiPath,
      req.method,
      req.headers.authorization,
    );
  }
}
