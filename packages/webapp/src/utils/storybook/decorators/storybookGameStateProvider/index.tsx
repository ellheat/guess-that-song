import { Args } from '@storybook/react';
import { FunctionComponent, ReactElement } from 'react';
import { GameStateContext } from '../../../../context';

export const withGameStateProvider = (Story: FunctionComponent, args: Args): ReactElement => {
    const { state } = args.args;

    return (
        <GameStateContext.Provider value={{ state }}>
            <Story />
        </GameStateContext.Provider>
    );
};
