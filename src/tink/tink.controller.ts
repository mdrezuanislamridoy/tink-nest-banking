import { Controller, Post, Query } from '@nestjs/common';
import { TinkService } from './tink.service';

@Controller('api/v1/oauth')
export class TinkController {
  constructor(private tinkService: TinkService) {}

  @Post('token')
  async token(@Query('code') code: string): Promise<any> {
    if (!code) {
      throw new Error('Missing "code"');
    }
    return this.tinkService.exchangeToken(code);
  }
}
