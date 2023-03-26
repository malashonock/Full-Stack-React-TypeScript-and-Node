import { Home } from 'features/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="categorythreads">
            <Route path=":categoryId" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
