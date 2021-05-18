import React, {useState, useEffect} from 'react';
import { AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';

function Customerlist() {

    const [customer, setCustomer] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then (data => setCustomer(data.content))
    }

    const deleteCustomer = (params) => {
        console.log(params);
    }
    
    const columns = [
        { field: 'firstname', sortable: true, filter: true},
        { field: 'lastname', sortable: true, filter: true},
        { field: 'streetaddress', sortable: true, filter: true},
        { field: 'postcode', sortable: true, filter: true},
        { field: 'city', sortable: true, filter: true},
        { field: 'email', sortable: true, filter: true},
        { field: 'phone', sortable: true, filter: true},
        //{
            //field: 'links.href',
            //cellRendererFramework: params => <button onClick={() => deleteCustomer(params)}>Delete</button>
        //}
        
    ]

    return (
        <div className="ag-theme-material" style={{ height: 1000, width: '100s%', margin: 'auto'}}>
            <AgGridReact
                 rowData={customer}
                 columnDefs={columns} 
             />
        </div>
    );

}

export default Customerlist;