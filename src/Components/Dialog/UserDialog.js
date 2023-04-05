import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import EditForm from '../EditForm/EditForm';
const UserDialog = ({open, handleClose, product, getProduct}) => {
    return ( 
        <Dialog  open={open} onClose={handleClose}>
        <DialogTitle>Product Form</DialogTitle>
        <DialogContent>
            <EditForm product={product} getProduct={getProduct}/>
        </DialogContent>
        </Dialog>
     );
}
 
export default UserDialog;