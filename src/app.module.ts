import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TennisService } from './tennis.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TennisService],
})
export class AppModule {}
