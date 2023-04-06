import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage, ThreadPage } from 'pages';
import { Nav } from 'common/components/layout';

import './App.scss';

export const App = () => {
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
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
