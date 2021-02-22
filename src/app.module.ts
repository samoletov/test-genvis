import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { GamesService } from './games.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GamesService],
})
export class AppModule {}
