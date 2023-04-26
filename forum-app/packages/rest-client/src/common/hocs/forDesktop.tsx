import { useWindowDimensions } from 'hooks';
import { FunctionComponent } from 'react';

export const forDesktop = <TProps extends object>(
  Component: FunctionComponent<TProps>,
): FunctionComponent<TProps> => {
  return (props: TProps): JSX.Element | null => {
    const { width } = useWindowDimensions();
    const isDesktop = width > 768;
    return isDesktop ? <Component {...props} /> : null;
  };
};
