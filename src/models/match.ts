import { IPlayer, Player } from './player';

export interface IMatch {
  id: number;
  name: string;
  players: IPlayer[];
  sets: IScore[];
  currentGame?: IScore;
  games: IScore;
}

export interface IScore {
  [key: string]: number;
}

export class Match implements IMatch {
  public players: IPlayer[];
  public name: string;
  public id: number;
  // sets finished
  public sets: IScore[];
  // current game score in points
  public currentGame?: IScore;
  public winner?: IPlayer;
  // games status in set
  public games: IScore;
  public tieBreaker?: IScore;

  constructor(name: string, players: IPlayer[]) {
    this.players = players;
    this.name = name;
    this.sets = [];
    this.games = this.initScore();
    this.currentGame = this.initScore();
  }

  initScore() {
    const score = {};
    this.players.forEach((player) => (score[player.id] = 0));
    return score;
  }

  setId(id: number) {
    this.id = id;
  }

  /**
   *
   * @param player
   * @returns true if game point won
   */
  addGamePoint(player: Player, looser: Player): boolean {
    const game = this.currentGame;

    game[player.id] += 1;
    if (game[player.id] === 5) {
      this.currentGame = this.initScore();
      this.games[player.id] += 1;
      return true;
    }
    // 40 - all
    if (game[looser.id] === 4) {
      game[looser.id] = 3;
      game[player.id] = 3;
    }
    return false;
  }

  addTieBreakerPoint(player: Player, looser: Player): boolean {
    const tie = this.tieBreaker;
    tie[player.id] += 1;
    if (tie[player.id] >= 7 && tie[player.id] - tie[looser.id] >= 2) {
      return true;
    }
    return false;
  }

  addPoint(player: Player): Match {
    const looser = this.players[0].id !== player.id ? this.players[0] : this.players[1];

    // tie breaker
    if (this.tieBreaker) {
      const setWon = this.addTieBreakerPoint(player, looser);
      if (setWon) {
        this.finishSet();
      }
      return this;
    }
    const gamePointWon = this.addGamePoint(player, looser);
    if (gamePointWon) {
      // check set winner conditions
      const gamesWon = this.games[player.id];
      if (gamesWon >= 6 && gamesWon - this.games[looser.id] >= 2) {
        this.sets.push(this.games);
      } else if (gamesWon === 6 && this.games[looser.id] === 6) {
        this.tieBreaker = this.initScore();
      }
      return this;
    }
    return this;
  }

  finishSet() {
    this.sets.push(this.games);
    this.tieBreaker = null;
  }
}
