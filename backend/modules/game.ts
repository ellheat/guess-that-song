import { Server, Socket } from 'socket.io';
import { Events } from '../config';
import { Quiz } from './quiz';

export enum GameState {
  Lobby = 'lobby',
  Quiz = 'quiz',
  Leaderboard = 'leaderboard',
}

export class Game {
  public state: GameState.Lobby | GameState.Quiz | GameState.Leaderboard;
  private quiz: Quiz;
  private io: Server;

  constructor(quiz: Quiz, io: Server) {
    this.state = GameState.Lobby;
    this.quiz = quiz;
    this.io = io;
  }

  emitState = () => this.io.emit(Events.GameState, this.state);

  setLobby = () => {
    this.state = GameState.Lobby;
    this.emitState();
  };

  setQuiz = (socket: Socket) => {
    this.state = GameState.Quiz;
    this.emitState();
    this.quiz.init(this.io, socket);
  };

  setLeaderboard = () => {
    this.state = GameState.Leaderboard;
    this.emitState();
  };
}
