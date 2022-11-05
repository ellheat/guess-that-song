import { FunctionComponent, ReactElement } from 'react';
import GlobalStyle from '../../../../theme/global';

export const withGlobalStyles = (Story: FunctionComponent): ReactElement => (
    <>
        <GlobalStyle />
        <Story />
    </>
);
