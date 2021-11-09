import { CharacterType } from './characters';


interface PlayerType extends CharacterType {
  id: string;
  points: number;
  correctAnswers: number;
  roundsWon: number;
  isReady: boolean;
  hasAnswered: boolean;
}

export class Players {
  private list;
  public areAllHaveAnswered: boolean;
  public areAllReady: boolean;

  constructor() {
    this.list = new Map<string, PlayerType>();
    this.areAllHaveAnswered = false;
    this.areAllReady = false;
  }

  add = (id: string, character: CharacterType) => {
    const player: PlayerType = Object.assign({}, {
      id,
      points: 0,
      correctAnswers: 0,
      roundsWon: 0,
      isReady: false,
      hasAnswered: false,
      ...character
    });
    this.list.set(id, player);
    return player;
  }

  remove = (id: string) => this.list.delete(id);

  getList = () => Array.from(this.list.values());

  getPlayer = (id: string) => <PlayerType>this.list.get(id);

  checkAreAllReady = () => {
    const list = this.getList();
    const filteredList = list.filter(({ isReady }: PlayerType) => isReady);
    this.areAllReady = list.length === filteredList.length;
  };

  checkAreAllHaveAnswered = () => {
    const list = this.getList();
    const filteredList = list.filter(({ hasAnswered }: PlayerType) => hasAnswered);
    this.areAllHaveAnswered = list.length === filteredList.length;
  };

  setReady = (id: string) => {
    const player = Object.assign(this.getPlayer(id), { isReady: true });
    this.list.set(id, player);
    return player;
  }

  setAnswer = (id: string) => {
    const player = this.getPlayer(id);
    const modifiedPlayer: PlayerType = Object.assign(player, { hasAnswered: true, points: player.points + 1 });
    this.list.set(id, modifiedPlayer);
  }
}
