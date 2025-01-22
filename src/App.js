
import './App.css';
import {Routes, Route} from "react-router-dom";
import ProductList from './pages/ProductList/ProductList';
import ProductDetails from './pages/ProductDetails/ProductDetails';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />}/>
        <Route path="/product/:id" element={<ProductDetails />}/>
      </Routes>

    </div>
  );
}

export default App;
