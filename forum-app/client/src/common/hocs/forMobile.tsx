import { useWindowDimensions } from 'hooks';
import { FunctionComponent } from 'react';

export const forMobile = <TProps extends object>(
  Component: FunctionComponent<TProps>,
): FunctionComponent<TProps> => {
  return (props: TProps): JSX.Element | null => {
    const { width } = useWindowDimensions();
    const isMobile = width <= 768;
    return isMobile ? <Component {...props} /> : null;
  };
};
