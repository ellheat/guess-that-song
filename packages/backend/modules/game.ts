import { Server } from 'socket.io';
import { Events, QuizEvents } from '../config';
import { Players } from './players';

export enum GameState {
  Lobby = 'lobby',
  Quiz = 'quiz',
  Leaderboard = 'leaderboard',
}

export class Game {
  public state: GameState.Lobby | GameState.Quiz | GameState.Leaderboard;
  private io;
  private players;

  constructor(io: Server, players: Players) {
    this.state = GameState.Lobby;
    this.players = players;
    this.io = io;
  }

  emitState = () => this.io.emit(Events.GameState, this.state);

  emitLeaderboard = () => this.io.emit(Events.PlayersList, this.players.getList());

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
    this.emitLeaderboard();
  };
}
