import { createMachine } from "xstate";

export enum GameStates {
	Lobby = 'lobby',
	Quiz = 'quiz',
	Leaderboard = 'leaderboard',
}

type GameStateContext = {
	state: GameStates.Lobby | GameStates.Quiz | GameStates.Leaderboard,
}

export const gameMachine = createMachine<GameStateContext>({
	id: 'game',
	initial: GameStates.Lobby,
	states: {
		[GameStates.Lobby]: {
			on: { NEXT: GameStates.Quiz },
		},
		[GameStates.Quiz]: {
			on: { PREV: GameStates.Lobby },
		},
	},
});
