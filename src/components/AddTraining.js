import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Toolbar } from '@material-ui/core';
import React, { useState } from 'react';

function AddTraining(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '',
        duration: '',
        activity: '',
    });

    const handleClickOpen = () => {
        console.log(props.training);
        setTraining({
            date: '',
            duration: '',
            activity: '',
            customer: props.customerRef
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleAdd = () => {
        console.log(training.date)
        const eventDate = new Date(training.date)
        setTraining({
            date: eventDate.toISOString()
        })
        props.addTraining(training);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <Toolbar>
                <Button style={{ color: 'white', backgroundColor: 'gray' }} onClick={handleClickOpen}>
                    Add Training
                </Button>
            </Toolbar>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add training</DialogTitle>
                <DialogContent>
                        <TextField 
                            margin="dense"
                            label="Date"
                            name="date"
                            value={training.date}
                            onChange={inputChanged}
                        />
                        <a> </a>
                        <TextField 
                            margin="dense"
                            label="Activity"
                            name="activity"
                            value={training.activity}
                            onChange={inputChanged}
                        />
                        <a> </a>
                        <TextField 
                            margin="dense"
                            label="Duration"
                            name="duration"
                            value={training.links}
                            onChange={inputChanged}
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd} style={{ color: 'white', backgroundColor: 'green'}}>
                        Add
                    </Button>
                    <Button onClick={handleClose} style={{ color: 'white', backgroundColor: 'red'}}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTraining;