export interface IPlayer {
  id: string;
  name: string;
}

export class Player implements IPlayer {
  public id: string;
  public name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
