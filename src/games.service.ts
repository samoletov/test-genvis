import { Injectable } from '@nestjs/common';

import { Game } from './models/game';
import { Player } from './models/player';

@Injectable()
export class GamesService {
  private games: Game[];
  constructor() {
    this.games = [];
  }
  create(name: string, players: Player[]) {
    const game = new Game(name, players);
    game.setId(this.games.length);
    this.games.push(game);
    return game;
  }
  retrieve(id: number) {
    return this.games[id];
  }
  addPoint(game: Game, player: Player) {
    return game;
  }
}
