import { LeftMenu, Main, Nav, RightMenu, Sidebar } from 'features/layout';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Nav />
      <Sidebar />
      <LeftMenu />
      <Main />
      <RightMenu />
    </div>
  );
};

export default App;
