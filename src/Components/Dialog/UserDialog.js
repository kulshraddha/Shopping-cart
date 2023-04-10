import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import EditForm from '../EditForm/EditForm';
import { useContext } from "react";
import ProductContext from '../productContext/ProdutContext';
const UserDialog = ({open }) => {
    const { handleClose, operation } = useContext(ProductContext);
    return ( 
        <Dialog  open={open} onClose={handleClose}>
        <DialogTitle>{operation == "edit" ? "Edit" : "Add"} Product Form</DialogTitle>
        <DialogContent>
            <EditForm/>
        </DialogContent>
        </Dialog>
     );
}
 
export default UserDialog;