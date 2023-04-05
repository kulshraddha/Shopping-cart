import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Formik, useFormik} from "formik"
import validateSchema from "../Validation/Validation";


const EditForm = ({product, getProduct}) => {
   
  // const [users, setUsers] = useState({});
  const [editProduct, setEditProduct] = useState({title:"", price:"", category:""});

useEffect(()=>{
 setEditProduct(product)
},[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };
 
  const handleSubmit = () => {
    console.log("user",editProduct);
    
  };
  useEffect(()=>{
    getProduct(editProduct)
     },[editProduct])


    
  return (

    <Formik  
      initialValues={{editProduct}}
      validationSchema={validateSchema}
    >
      {({handleBlur, errors, touched}) => (
   
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="title"
          name="title"
          value={editProduct.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.title && errors?.title ? true : false}
          helperText={touched?.title && errors?.title}
          varient="outlined"
          fullWidth
  
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="category"
          name="category"            
          value={editProduct.category}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.category && errors?.category ? true : false}
          helperText={touched?.category && errors?.category}
          varient="outlined"
          fullWidth
        />

      </Grid>
      <Grid item xs={12}>
        <TextField
          label="price"
          name="price"
          value={editProduct.price}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.price && errors?.price ? true : false}
          helperText={touched?.price && errors?.price}
          varient="outlined"
          fullWidth
        />
      </Grid>
     
      <Button
       
        color="primary"
        variant="contained"
        style={{marginLeft: 250, marginTop: 20}}
        onClick={handleSubmit}
      >
        Add
      </Button>
    </Grid>
     )}
    </Formik>
  
  )
}
export default EditForm
