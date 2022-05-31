import { Server } from 'socket.io';
import { Events } from '../config';
import { Quiz } from './quiz';

export enum GameState {
  Lobby = 'lobby',
  Quiz = 'quiz',
  Leaderboard = 'leaderboard',
}

export class Game {
  public state: GameState.Lobby | GameState.Quiz | GameState.Leaderboard;
  private io: Server;

  constructor(io: Server) {
    this.state = GameState.Lobby;
    this.io = io;
  }

  emitState = () => this.io.emit(Events.GameState, this.state);

  setLobby = () => {
    this.state = GameState.Lobby;
    this.emitState();
  };

  setQuiz = () => {
    this.state = GameState.Quiz;
    this.emitState();
  };

  setLeaderboard = () => {
    this.state = GameState.Leaderboard;
    this.emitState();
  };
}
