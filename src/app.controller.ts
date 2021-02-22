import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Player } from './models/player';
import { CreateMatchDto, MatchDto, PointDto } from './tennis.dto';
import { TennisService } from './tennis.service';

@Controller()
@ApiTags('tennis')
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  constructor(private readonly tennisService: TennisService) {}

  @Post('matches')
  @ApiOperation({
    summary: 'Create game',
  })
  @ApiOkResponse({
    description: 'Game status',
    type: MatchDto,
  })
  createMatch(@Body() dto: CreateMatchDto): MatchDto {
    const players = Object.entries(dto.players).map((playerData) => {
      return new Player(playerData[0], playerData[1]);
    });
    return new MatchDto(this.tennisService.create(dto.name, players));
  }

  @Post('matches/:id')
  @ApiOperation({
    summary: 'Add point to a game',
  })
  @ApiOkResponse({
    description: 'Game status',
    type: MatchDto,
  })
  addPoint(@Body() dto: PointDto): MatchDto {
    const game = this.tennisService.retrieve(dto.gameId);
    const player = game.players.find((player) => player.id === dto.point);
    if (!player) {
      throw new Error(`Player "${dto.point}" was not found in this game`);
    }
    return new MatchDto(this.tennisService.addPoint(game, player));
  }

  @Get('matches/:id')
  @ApiOperation({
    summary: 'Get game status',
  })
  @ApiOkResponse({
    description: 'Game status',
    type: MatchDto,
  })
  result(@Param() id: number): MatchDto {
    const game = this.tennisService.retrieve(id);

    return new MatchDto(game);
  }
}
