import { CharacterType } from './characters';


interface PlayerType extends CharacterType {
  id: string;
  points: number;
  correctAnswers: number;
  roundsWon: number;
  isReady: boolean;
}

export class Players {
  private list;
  public areAllReady: boolean;

  constructor() {
    this.list = new Map<string, PlayerType>();
    this.areAllReady = false;
  }

  add = (id: string, character: CharacterType) => {
    const player = Object.assign({}, {
      id,
      points: 0,
      correctAnswers: 0,
      roundsWon: 0,
      isReady: false,
      ...character
    });
    this.list.set(id, player);
    return player;
  }

  remove = (id: string) => this.list.delete(id);

  getList = () => Array.from(this.list.values());

  checkAreAllReady = () => {
    const list = this.getList();
    const filteredList = list.filter(({ isReady }: PlayerType) => isReady);
    this.areAllReady = list.length === filteredList.length;
  };

  setReady = (id: string) => {
    const player = Object.assign(this.list.get(id), { isReady: true });
    this.list.set(id, player);
    return player;
  }
}
