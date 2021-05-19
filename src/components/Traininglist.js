import React, {useState, useEffect} from 'react';
import { AgGridReact} from 'ag-grid-react';
import moment, { isMoment } from 'moment';

import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import Delete from '@material-ui/icons/Delete';
import Iconbutton from '@material-ui/core/IconButton';

function Traininglist() {

    const [trainingList, setTrainingList] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then (data => setTrainingList(data.content))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
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

    const columns = [
        { field: 'date', sortable: true, filter: true, 
        cellRenderer: (data) => {
            return moment(data.createdAt).format('HH:mm DD/MM/YYYY')
        }},
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        {
            field: 'links.1.href', headerName: '', width: 150,
            cellRendererFramework: params => 
                <Iconbutton onClick={() => deleteTraining(params.value)} style={{ color: 'red' }}>
                    <Delete />
                </Iconbutton>
        },
    ]

    return (
        <div className="ag-theme-material" style={{ height: 1000, width: '50%', margin: 'auto'}}>
            <AgGridReact
                rowData={trainingList}
                columnDefs={columns} 
            />
        </div>
    );

}

export default Traininglist;