import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar } from '@material-ui/core';
import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import Iconbutton from '@material-ui/core/IconButton';

function EditCustomer(props) {

    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    const handleClickOpen = () => {
        console.log(props.customer);
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleEdit = () => {
        props.updateCustomer(props.link, customer);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <Iconbutton onClick={handleClickOpen}>
                <EditIcon />
             </Iconbutton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new customer</DialogTitle>
                <DialogContent>
                    <TextField 
                        margin="dense"
                        label="Firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                    />
                    <a> </a>
                    <TextField 
                        margin="dense"
                        label="Lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                    />
                    <a> </a>
                    <TextField 
                        margin="dense"
                        label="Streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                    />
                    <a> </a>
                    <TextField
                        margin="dense" 
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                    />
                    <a> </a>
                    <TextField 
                        margin="dense"
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={inputChanged}
                    /> 
                    <a> </a>
                    <TextField 
                        margin="dense"
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                    />
                    <a> </a>
                    <TextField 
                        margin="dense"
                        label="Phone number"
                        name="phone"
                        value={customer.phone}
                        onChange={inputChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEdit} style={{ color: 'white', backgroundColor: 'green'}}>
                        Save
                    </Button>
                    <Button onClick={handleClose} style={{ color: 'white', backgroundColor: 'red'}}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCustomer;