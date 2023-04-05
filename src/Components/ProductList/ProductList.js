import React, { useEffect, useState } from 'react';
import axios from "axios"
import { CardContent, CardHeader, IconButton } from '@mui/material';
import UserDialog from '../Dialog/UserDialog';
import Header from '../Header/Header';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ShopProduct = (product) => {
    const { id, title, price, category, image , handleEdit,  removeProduct} = product
    return (
        //Bootstrap cards for products
    <div>
    <Card style={{ width: '18rem', height: 450, width: 350}}>
      <Card.Img variant="top" src={image} style={{width: 200, height: 200}}/>
      <Card.Body>
        <Card.Title>
        {id} - {title}
      </Card.Title>
        <CardContent>${price}</CardContent>
        <CardContent>{category}</CardContent>
        <Button variant="primary"><Link to={`/${id}`}style={{color: "#fff", textDecoration:"none"}}>Details</Link></Button>
        <Button onClick={()=> handleEdit(product)}>Edit</Button>
        <Button onClick={()=> removeProduct(product)}>Delete</Button>
      </Card.Body>
    </Card>
    </div>
    )
}

const ProductList = () => {
    //fetching products
    const [products , setProducts] = useState([])
    //dialog open ro close state
    const [open, setOpen] = useState(false); 
    //single product
    const [product, setProduct] = useState("")
    const [load, setLoad] = useState(6)

    //api fetching by get method
    useEffect(()=>{
    axios
    .get("https://fakestoreapi.com/products")
    .then((response)=>{
        setProducts(response.data)
    })
    .catch((err)=>{
        console.log(err);
    })
    },[])

    const loadMore = () => {
        setLoad((prevValue) => prevValue + 6)
    
      }

    const getProduct = ((product)=>{
     const Index = products.findIndex((prod)=> prod?.id === product?.id)
     products.splice(Index, 1, product)
     console.log("productlist", product, products);
    })

    const removeProduct = (product)=>{
        var arr = products.filter((prod)=> prod?.id != product?.id)
        setProducts(arr)
        console.log("delete", arr);
    }

    //fuction for edit button
    const handleEdit = ((product) => {
        console.log("pro",product);
        setProduct(product)
        //dialog open
        setOpen(true)
    })

    //dialog close
    const handleClose = () => setOpen(false);
    
    return ( 
        <>
        {/* inside header */}
        <Header/>

        {/* rendaring the products */}
        <section style={{ display: "flex", flexWrap: "wrap"}}>
          {Array.isArray(products) && products.slice(0, load).map((prod) => {
            return (
                <div style={{  width:500, height: 500, padding: 10 }} >
                    <ShopProduct {...prod} handleEdit={handleEdit} products={products} removeProduct={removeProduct}/>
                </div>
            )
          })}

          <UserDialog  open={open} handleClose={handleClose} product={product} getProduct={getProduct} />
        </section>

        {/* loadMore button */}
        <div style={{textAlign:"center"}}>
        <Button variant='primary' onClick={loadMore} >load more</Button>
      </div>
        </>
     );
}
 
export default ProductList;