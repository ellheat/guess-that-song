import { ReactNode, Fragment } from 'react';
import GlobalStyle from '../theme/global';

export type AppComponentProps = {
  children?: ReactNode;
};

export const AppComponent = ({ children }: AppComponentProps) => {
  console.log('app');
  return (
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  );
}
