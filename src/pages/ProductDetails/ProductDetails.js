import React from 'react';
import "./ProductDetails.css"
import { useLocation, useNavigate} from 'react-router-dom';

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate()

  if(!product){
    return <h2>Product Not Found</h2>
  }
  return (
    <>
    <div className="product-details-container">
      <div className="product-details-box">
        <h1>{product.name}</h1>
        <div className="product-image-container">
          <img src={product.images.front} alt={product.name} className="product-image" />
        </div>
        <p className="description">{product.description}</p>
        <p className="price">{product.mrp ? `₹${product.mrp.mrp}` : 'Price Not Available'}</p>
      </div>
      
    </div>
    <div onClick={()=>navigate("/")} className='button'>Back</div>
    </>
  )
}

export default ProductDetails
