import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GamesService } from './games.service';
import { Player } from './models/player';
import { CreateGameDto, GameDto, PointDto } from './tennis.dto';

@Controller()
@ApiTags('tennis')
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  constructor(private readonly gamesService: GamesService) {}

  @Post('game')
  @ApiOperation({
    summary: 'Create game',
  })
  @ApiOkResponse({
    description: 'Game status',
    type: GameDto,
  })
  // @ApiBody({
  //   description: 'Workload',
  //   type: CarDto,
  //   isArray: true,
  // })
  createGame(@Body() dto: CreateGameDto): GameDto {
    const players = Object.entries(dto.players).map((playerData) => {
      return new Player(playerData[0], playerData[1]);
    });
    return new GameDto(this.gamesService.create(dto.name, players));
  }

  @Post('game/:id')
  @ApiOperation({
    summary: 'Add point to a game',
  })
  @ApiOkResponse({
    description: 'Game status',
    type: GameDto,
  })
  addPoint(@Body() dto: PointDto): GameDto {
    const game = this.gamesService.retrieve(dto.gameId);
    const player = game.players.find((player) => player.name === dto.point);

    return new GameDto(this.gamesService.addPoint(game, player));
  }

  @Get('game/:id')
  @ApiOperation({
    summary: 'Get game status',
  })
  @ApiOkResponse({
    description: 'Game status',
    type: GameDto,
  })
  result(@Param() id: number): GameDto {
    const game = this.gamesService.retrieve(id);

    return new GameDto(game);
  }
}
