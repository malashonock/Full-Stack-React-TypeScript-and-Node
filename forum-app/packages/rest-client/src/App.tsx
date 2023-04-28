import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Nav } from 'common/components/layout';
import { HomePage, ThreadPage, UserProfilePage } from 'pages';
import { useSyncLogin } from 'hooks';

import './App.scss';

export const App = () => {
  useSyncLogin();

  return (
    <BrowserRouter>
      <div className="screen-root-container">
        <Nav />
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="categorythreads">
              <Route path=":categoryId" element={<HomePage />} />
            </Route>
            <Route path="thread">
              <Route path=":threadId" element={<ThreadPage />} />
            </Route>
            <Route path="userprofile">
              <Route path=":userId" element={<UserProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
