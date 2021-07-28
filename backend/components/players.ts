import { CharacterType } from './characters';

interface PlayerType extends CharacterType {
  id: string;
  points: number;
  correctAnswers: number;
  roundsWon: number;
}

export class Players {
  private list;

  constructor() {
    this.list = new Map<string, PlayerType>();
  }

  add = (id: string, character: CharacterType) => {
    const player = Object.assign({}, {
      id,
      points: 0,
      correctAnswers: 0,
      roundsWon: 0,
      ...character
    });
    this.list.set(id, player);
    return player;
  }

  remove = (id: string) => this.list.delete(id);

  getList = () => Array.from(this.list.values());
}
