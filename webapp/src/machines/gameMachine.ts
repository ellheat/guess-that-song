import { createMachine } from "xstate";

export enum GameStates {
  Lobby = 'lobby',
  Quiz = 'quiz',
  Leaderboard = 'leaderboard',
}

export const gameMachine = createMachine({
  id: "game",
  initial: GameStates.Lobby,
  states: {
    [GameStates.Lobby]: {
      on: { NEXT: GameStates.Quiz },
    },
    [GameStates.Quiz]: {
      on: { NEXT: GameStates.Leaderboard },
    },
    [GameStates.Leaderboard]: {
      on: { NEXT: GameStates.Lobby },
    },
  },
});
