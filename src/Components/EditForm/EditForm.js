import React, { useContext, useEffect, useState } from 'react';
import { Grid, Box, TextField, Button } from "@mui/material";
import { Formik, useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import validateSchema from '../Validation/Validation';
import ProductContext from '../productContext/ProdutContext';
const EditForm = () => {
  const { loadUsers, handleClose, operation, initialProduct } =
  useContext(ProductContext);

  //product form state
  const [productForm, setproductForm] = useState({
    title: "",
    category: "",
    price: "",
  });

  //change the values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setproductForm({ ...productForm, [name]: value });
  };

  //to take prifilled values for edit
  useEffect(() => {
    if (initialProduct) setproductForm({ ...productForm, ...initialProduct });
  }, [initialProduct]);


// for edit put method call or new product added
  const handleSubmit = () => {
    if (productForm.title && productForm.price) {
      if (operation == "edit") {
        axios
          .put(`http://localhost:8989/products/${productForm.id}`, productForm)
          .then((response) => {
            alert("product updated...");
            loadUsers();
            handleClose();
          })
          .catch((err) => {
            console.log(err);
            alert("Could not update the product");
          });
      } else {
        axios
          .post("http://localhost:8989/products", productForm)
          .then((response) => {
            alert("product Added..");
            loadUsers();
            handleClose();
          })
          .catch((err) => {
            console.log(err);
            alert("Could not created the product");
          });
      }
    }
  };

 const formik = useFormik({
  initialValues: productForm,
  validationSchema: yup.object({
    title: yup.string()
      .required('title is Required!'),
    category: yup.string()
    .required('catagoty is required!'),
    price: yup.string()
    .required('price is required!'),
  })
 })
console.log("products", productForm);
  //product form
  return ( 
    <>
    
    <Box component="form">
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="title"
          name="title"
          value={productForm.title}
          onChange={handleChange}
          fullWidth
  
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="category"
          name="category"            
          value={productForm.category}
          onChange={handleChange}
          varient="outlined"
          fullWidth
        />

      </Grid>
      <Grid item xs={12}>
        <TextField
          label="price"
          name="price"
          value={productForm.price}
          onChange={handleChange}
          varient="outlined"
          fullWidth
        />
      </Grid>
     
      <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {operation == "edit" ? "update" : "create"}
            </Button>
          </Grid>
    </Grid>
    </Box>
    
  </>
   );
}
 
export default EditForm;