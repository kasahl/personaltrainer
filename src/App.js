import React, { useEffect, useState } from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

function App() {

  const [list, setList] = React.useState('customer');

  return (
    <div className="App">
      <AppBar position="sticky" style={{backgroundColor: 'green'}}>
        <Toolbar>
          <Typography variant="h6">
            <h3>Personal Trainer</h3>
            <div>
              <Button style={{color: 'white', marginLeft: 20, marginRight: 20 }} onClick={() => setList('customer')}>Customerlist</Button>
              <Button style={{color: 'white', marginLeft: 20 }} onClick={() => setList('training')}>Traininglist</Button>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      {list === 'customer' ? <Customerlist /> : null}
      {list === 'training' ? <Traininglist /> : null}
    </div>
  );

}

export default App;
