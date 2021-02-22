import { Injectable } from '@nestjs/common';

import { Match } from './models/match';
import { Player } from './models/player';

@Injectable()
export class TennisService {
  private matches: Match[];

  constructor() {
    this.matches = [];
  }

  create(name: string, players: Player[]) {
    const match = new Match(name, players);
    match.setId(this.matches.length);
    this.matches.push(match);
    return match;
  }

  retrieve(id: number) {
    return this.matches[id];
  }

  addPoint(match: Match, player: Player) {
    // init new set if not exists
    match.addPoint(player);

    return match;
  }
}
