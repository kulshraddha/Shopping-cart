import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MuiDatatable from "mui-datatables"; 
import { Button } from "@mui/material";
import UserDialog from '../Dialog/UserDialog';
import ProductContext from '../productContext/ProdutContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const ProductList = () => {

  //all products
  const [products, setProducts] = useState([])

  //state for dialog open and close
  const [openDialog, setOpenDialog] = useState(false);

  //for single product object state
  const [initialProduct, setInitialProduct] = useState({});

  //for add new product state
  const [operation, setOperation] = useState("add");

  const [productDetail, setProductDetail] = useState({});

  //dialog close
  const handleClose = () => {
    setOpenDialog(false);
  };

  //edit product and dialog open 
  const editUser = (products) => {
    setOpenDialog(true);
    setOperation("edit");
    setInitialProduct(products);
  };

  //add new Product and dialog open
  const AddProduct = () => {
    setOpenDialog(true);
    setOperation("add");
  };

  //data fetching
  const loadUsers = () => {
    axios
      .get("http://localhost:8989/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch(console.log);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  //delete product
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8989/products/${id}`)
          .then((response) => {
            loadUsers();
            Swal.fire("Deleted!", "Your record has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Deleted!", "Your file has not been deleted.", "error");
          });
      }
    });
  };




  //table

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: "category",
      label: "category",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: "price",
      label: "price",
      options: {
        sort: true,
        filter: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const product = products[index];
          console.log("id",product);
          return (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => editUser(product)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteUser(product.id)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
              //  onClick={() => console.log("jjj",product.id)}
              >
                 <Link to={`${product.id}`}>Details</Link>
                 
              </Button>
            </>
          );
        },
      },
    },
  ];

  return ( 
    <>
     <ProductContext.Provider
        value={{ loadUsers, handleClose, operation, initialProduct }}
      >
        <UserDialog open={openDialog} handleClose={handleClose} />
      </ProductContext.Provider>
    <Button variant="contained" onClick={AddProduct}>
        New+
      </Button>
     <MuiDatatable columns={columns} data={products}/>
    </>
   );
}
 
export default ProductList;