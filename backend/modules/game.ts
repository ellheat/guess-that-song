import { Server } from 'socket.io';
import { Events, gameConfig } from '../config';

export enum GameState {
  Lobby = 'lobby',
  Quiz = 'quiz',
  Leaderboard = 'leaderboard',
}

export class Game {
  public state: GameState.Lobby | GameState.Quiz | GameState.Leaderboard;
  // public round: number;
  // public timer: number;

  constructor() {
    this.state = GameState.Lobby;
    // this.round = 1;
    // this.timer = gameConfig.maxTimePerRound;
  }

  emitState = (io: Server) => io.emit(Events.GameState, this.state);
  //
  // emitRound = (io: Server) => io.emit(Events.GameRound, this.round);
  //
  // emitTimer = (io: Server) => io.emit(Events.RoundTimer, this.timer);

  setLobby = (io: Server) => {
    this.state = GameState.Lobby;
    this.emitState(io);
  };

  setQuiz = (io: Server) => {
    this.state = GameState.Quiz;
    this.emitState(io);
  };

  setLeaderboard = (io: Server) => {
    this.state = GameState.Leaderboard;
    this.emitState(io);
  };

  // setNextRound = (io: Server) => {
  //   if (this.round < gameConfig.maxRounds) {
  //     this.round = this.round + 1;
  //     this.emitRound(io);
  //   }
  //   this.setLeaderboard(io);
  // };
  //
  // countdown = (io: Server) => {
  //   const interval = setInterval(() => {
  //     this.emitTimer(io);
  //     if (this.timer === 0) {
  //       this.timer = gameConfig.maxTimePerRound;
  //       clearInterval(interval);
  //     }
  //     this.timer = this.timer - 1;
  //   }, 1000);
  // };
}
