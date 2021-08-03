import { Server } from 'socket.io';
import { Events } from '../config';

enum GameState {
  Lobby = 'lobby',
  Quiz = 'quiz',
  Leaderboard = 'leaderboard',
}

export class Game {
  public state: GameState.Lobby | GameState.Quiz | GameState.Leaderboard;

  constructor() {
    this.state = GameState.Lobby;
  }

  emitState = (io: Server) => io.emit(Events.GameState, this.state);

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
}
