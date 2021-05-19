import React, {useState, useEffect} from 'react';
import { AgGridReact} from 'ag-grid-react';
import AddCustomer from "./AddCustomer"
import EditCustomer from './EditCustomer';

import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import Delete from '@material-ui/icons/Delete';
import Iconbutton from '@material-ui/core/IconButton';
import moment, { isMoment } from 'moment';
import AddTraining from './AddTraining';

function Customerlist() {

    const [customer, setCustomer] = useState([]);
   // const [trainig, setTraining] = useState({});
    
    useEffect(() => fetchData(), []);

   // useEffect(() => fetchTrainingData(), []);

   /*const fetchTrainingData = () => {
       fetch('https://customerrest.herokuapp.com/api/customers')
       .then(trainingResponse => trainingResponse.json())
       .then(trainingData => setTraining(trainingData.links[2].href))
       .catch(err => console.error(err))
    }*/

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if(window.confirm('Confirm deletion')) {
            fetch(link, { method: 'DELETE' })
            .then(response => {
                if(response.ok)
                 fetchData();
                else
                 alert('Something went wrong!');
            })
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'content-type' : 'application/json' }
        })
        .then(response => {
            if(response.ok)
                fetchData();
            else
                alert('Something went wrong!');
        })
        .catch(err => console.error(err))
    }

    /*const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'content-type' : 'application/json' }
        })
        .then(response => {
            if(response.ok)
                fetchData();
            else
                alert('Something went wrong!');
        })
        .catch(err => console.error(err))
    }*/

    const updateCustomer = (link, updatedCustomer) => {
        fetch(link, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers:  { 'content-type' : 'application/json' }
        })
        .then(response => {
            if(response.ok)
                fetchData();
            else
                alert('Something went wrong!');
        })
        .catch(err => console.error(err))
    }
    
    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', headerName: 'Street address', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', headerName: 'Phone number', sortable: true, filter: true },
        {
            field: 'links.1.href', headerName: '', width: 100,
            cellRendererFramework: params => 
                <EditCustomer link={params.value} customer={params.data} updateCustomer={updateCustomer} />
        },
        {
            field: 'links.1.href', headerName: '', width: 100,
            cellRendererFramework: params => 
                <Iconbutton onClick={() => deleteCustomer(params.value)} style={{ color: 'red' }}>
                    <Delete />
                </Iconbutton>
        },
        /*{
            field: 'links.2.href', headerName: 'Trainings', width: '500',
            cellRendererFramework: params =>
                <AddTraining addTraining={addTraining} training={params.trainingData} />
        },   */ 
        
        
    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: 1000, width: '100%', margin: 'auto'}}>
                <AgGridReact
                    rowData={customer}
                    columnDefs={columns} 
                    suppressCellSelection={true}
                />
            </div>
        </div>
    );

}

export default Customerlist;