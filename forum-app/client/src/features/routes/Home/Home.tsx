import { Nav, Sidebar, LeftMenu, Main, RightMenu } from 'features/layout';

import './Home.scss';

export const Home = () => {
  return (
    <div className="screen-root-container home-container">
      <Nav />
      <Sidebar />
      <LeftMenu />
      <Main />
      <RightMenu />
    </div>
  );
};
