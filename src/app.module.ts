import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TinkModule } from './tink/tink.module';
import { ProxyModule } from './proxy/proxy.module';
import { CallbackController } from './tink/callback.controller';
import { TinkService } from './tink/tink.service';

@Module({
  imports: [TinkModule, ProxyModule],
  controllers: [AppController, CallbackController],
  providers: [AppService, TinkService],
})
export class AppModule {}
