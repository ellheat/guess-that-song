import { createMachine } from "xstate";

export const gameMachine = createMachine({
  id: "game",
  initial: "start",
  states: {
    start: {
      on: { NEXT: "lobby" },
    },
    lobby: {
      on: { NEXT: "game" },
    },
    game: {},
  },
});
