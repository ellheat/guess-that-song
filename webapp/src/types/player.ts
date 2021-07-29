export enum PlayerStatus {
  NotReady = 'not ready',
  Ready = 'ready',
}

export type PlayerType = {
  id: string;
  name: string;
  color: string;
  points: number;
  correctAnswers: number;
  roundsWon: number;
  status: PlayerStatus.NotReady | PlayerStatus.Ready;
}
