import logo from './logo.svg';
import './App.css';
import ProductList from './Components/ProductList/ProductList';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';

function App() {
  return (
  <> 
    <Routes>
        <Route path="" element={ <Header/>} />
        <Route path="secured/*" element={ <ProductList/>} />
        <Route path=":id" element={<ProductDetails/>} />
    </Routes>
  </>
  );
}

export default App;
