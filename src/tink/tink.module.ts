import { Module } from '@nestjs/common';
import { TinkService } from './tink.service';
import { TinkController } from './tink.controller';
import { ConsoleController } from './console.controller';

@Module({
  controllers: [TinkController, ConsoleController],
  providers: [TinkService],
})
export class TinkModule {}
