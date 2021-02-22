import { ApiProperty } from '@nestjs/swagger';

import { IGame, ISet } from './models/game';

export class PlayersDto {
  [key: string]: string;
}

export class CreateGameDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  players: PlayersDto;
}

export class PointDto {
  @ApiProperty()
  gameId: number;
  @ApiProperty()
  point: string;
}

export class SetDto {
  [key: string]: number;
}

export class GameDto {
  @ApiProperty()
  gameId: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: SetDto, isArray: true })
  sets: SetDto[];
  @ApiProperty()
  currentGame: ISet;

  constructor(game: IGame) {
    this.gameId = game.id;
    this.name = game.name;
    this.sets = game.sets;
    this.currentGame = game.currentGame;
  }
}
