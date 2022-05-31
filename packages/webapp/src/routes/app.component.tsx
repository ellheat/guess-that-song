import { ReactNode, Fragment } from 'react';
import GlobalStyle from '../theme/global';

export type AppComponentProps = {
	children?: ReactNode;
};

export const AppComponent = ({ children }: AppComponentProps) => {
	return (
		<Fragment>
			<GlobalStyle />
			{children}
		</Fragment>
	);
}
