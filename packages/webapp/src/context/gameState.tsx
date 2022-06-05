import { createContext, ReactNode, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { StateValue } from 'xstate';

import { gameMachine, GameStates } from '../machines';
import { socket } from '../utils/socket';
import { Events } from '../config/events';


type StateType = StateValue;

export interface IGameStateContext {
	state: StateType;
}

export const GameStateContext = createContext<IGameStateContext>({
	state: GameStates.Lobby,
});

type GameStateProviderProps = {
	children: ReactNode,
}

export const GameStateProvider = ({ children }: GameStateProviderProps) => {
	const [current, send] = useMachine(gameMachine);

	useEffect(() => {
		socket.on(Events.GameState, (state: string) => {
			if (current.value === GameStates.Lobby && state === GameStates.Quiz) {
				send('NEXT');
			}
			if (current.value === GameStates.Quiz && state === GameStates.Lobby) {
				send('PREV');
			}
		});
	}, [current.value, send]);

	const value = {
		state: current.value,
	};

	return (
		<GameStateContext.Provider value={value}>
			{children}
		</GameStateContext.Provider>
	);
}
