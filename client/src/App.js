import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CreateProduct from './Pages/CreateProduct';
import NotFound from './Pages/NotFound';
import UpdateProduct from './Pages/UpdateProduct';
import ViewProduct from './Pages/ViewProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/view/:id" element={<ViewProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
