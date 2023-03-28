import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from 'pages';

import './App.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="categorythreads">
            <Route path=":categoryId" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
