import { IPlayer } from './player';

export interface IGame {
  id: number;
  name: string;
  players: IPlayer[];
  sets: ISet[];
  currentGame: ISet;
}

export interface ISet {
  [key: string]: number;
}

export class Game implements IGame {
  public players: IPlayer[];
  public name: string;
  public id: number;
  public sets: ISet[];
  public currentGame: ISet;

  constructor(name: string, players: IPlayer[]) {
    this.players = players;
    this.name = name;
    this.sets = [];
  }
  setId(id: number) {
    this.id = id;
  }
}
