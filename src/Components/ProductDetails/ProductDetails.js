import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
const ProductDetails = () => {
  const {product} = useParams();
  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    axios
    .get(`http://localhost:8989/products/${product.id}`)
      .then((response) => {
        setProductDetail(response.data);
        console.log("data", productDetail);
      })
      .catch(console.log);
  }, [product.id]);

  console.log("fff",product);


  return ( 
    <>
    
      <h2>user Details</h2>
      <h3>
        title:{productDetail.id}
      </h3>
      <h4>category: {productDetail.category}</h4>
    </>
   );
}
 
export default ProductDetails;