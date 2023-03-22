import { useWindowDimensions } from 'hooks';

export const RightMenu = () => {
  const { width } = useWindowDimensions();

  if (width <= 768) {
    return null;
  }

  return <div className="rightmenu">Right Menu</div>;
};
