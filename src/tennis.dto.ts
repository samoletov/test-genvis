import { ApiProperty } from '@nestjs/swagger';

import { IMatch } from './models/match';

export class PlayersDto {
  [key: string]: string;
}

export class CreateMatchDto {
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

export class ScoreDto {
  [key: string]: number | string;
}

export class MatchDto {
  @ApiProperty()
  gameId: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: ScoreDto, isArray: true })
  sets: ScoreDto[];
  @ApiProperty()
  currentGame?: ScoreDto;
  @ApiProperty()
  games: ScoreDto;

  constructor(match: IMatch) {
    this.gameId = match.id;
    this.name = match.name;
    this.sets = match.sets;
    this.games = match.games;
    this.currentGame = {};
    Object.entries(match.currentGame).map((item) => {
      let result = 'love';
      switch (item[1]) {
        case 1:
          result = '15';
          break;
        case 2:
          result = '30';
          break;
        case 3:
          result = '40';
          break;
        case 4:
          result = 'game';
          break;
      }
      this.currentGame[item[0]] = result;
    });
  }
}
