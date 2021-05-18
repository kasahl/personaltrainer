import React, {useState, useEffect} from 'react';
import { AgGridReact} from 'ag-grid-react';
import moment, { isMoment } from 'moment';

import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';

function Traininglist() {

    const [training, setTraining] = useState([]);

    useEffect(() => fetchData(), []);

    const dateStyle = () => {
        moment().format("MMM Do YY");   
    }

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then (data => setTraining(data.content))
    }

    const columns = [
        { field: 'date', sortable: true, filter: true, width: 500, 
        cellRenderer: (data) => {
            return moment(data.createdAt).format('HH:mm DD/MM/YYYY')
        }},
        { field: 'duration', sortable: true, filter: true, width: 500},
        { field: 'activity', sortable: true, filter: true, width: 500},
        
    ]

    return (
        <div className="ag-theme-material" style={{ height: 1000, width: '100%', margin: 'auto'}}>
            <AgGridReact
                rowData={training}
                columnDefs={columns} 
            />
        </div>
    );

}

export default Traininglist;