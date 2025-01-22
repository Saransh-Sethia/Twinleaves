
import './App.css';
import {Routes, Route} from "react-router-dom";
import ProductList from './pages/ProductList/ProductList';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />}/>
      </Routes>

    </div>
  );
}

export default App;
