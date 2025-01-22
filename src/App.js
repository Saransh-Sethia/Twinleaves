import React, {Suspense, lazy} from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";

const ProductList = lazy(() =>import('./pages/ProductList/ProductList'));
const ProductDetails = lazy(() =>import('./pages/ProductDetails/ProductDetails'));

function App() {
  
  return (
    <div className="App">
      <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path="/" element={<ProductList />}/>
        <Route path="/product/:id" element={<ProductDetails />}/>
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
