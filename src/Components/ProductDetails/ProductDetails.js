import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
const ProductDetails = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    useEffect(() => {
        axios
          .get(`https://fakestoreapi.com/products/${id}`)
          .then((response) => {
            setDetails(response.data);
          })
    
          .catch((err) => {
            console.log(err);
          });
      }, [id]);

      const {title, category, price, description, image} = details

    return ( 
        <>
        <Button color='primary' variant='contained'><Link to="/secured" style={{color: "#fff", textDecoration:"none"}}>Back</Link></Button>
         <div
        style={{
          width: "50%",
          margin: "auto",
          padding: 20,
          border: "1px solid #999",
          boxShadow: "0 0 4px 2px #666",
        }}
      >
        <h2>Post Details</h2>
        <div className='row'>
           <div className='col-md-6'>
            <img src={image} style={{height: 400, weidth: 400}}/>
           </div>
           <div className='col-md-6'>
           <h3>{title}</h3>
        <h3>${price}</h3>
        <h3>{category}</h3>
        <p>{description}</p>
           </div>
        </div>
      </div>
        </>
     );
}
 
export default ProductDetails;