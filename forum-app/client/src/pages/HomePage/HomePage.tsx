import { Nav } from 'common/components/layout';
import { DesktopSidebar, LeftMenu, Main, RightMenu } from './components';

import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="screen-root-container home-container">
      <Nav />
      <DesktopSidebar />
      <LeftMenu />
      <Main />
      <RightMenu />
    </div>
  );
};
