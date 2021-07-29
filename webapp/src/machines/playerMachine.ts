import { createMachine } from "xstate";

export enum PlayerStates {
  Start = 'start',
  Lobby = 'lobby',
  Quiz = 'quiz',
  End = 'end',
}

export const playerMachine = createMachine({
  id: "player",
  initial: PlayerStates.Lobby,
  states: {
    [PlayerStates.Lobby]: {
      on: { NEXT: PlayerStates.Quiz },
    },
    [PlayerStates.Quiz]: {
      on: { NEXT: PlayerStates.End },
    },
    [PlayerStates.End]: {
      on: { NEXT: PlayerStates.Lobby },
    },
  },
});
