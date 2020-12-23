import React from 'react';
import Appbar from './components/Appbar';
import AvatarList from './components/AvatarList';
import Grid from '@material-ui/core/Grid';

const App = () => {
  return (
    <>
      <Grid container>
        <Appbar />
        <Grid container spacing={1}>
          <Grid container item xs={12} sm={2} spacing={1}>
          </Grid>
          <Grid container item xs={12} sm={8} spacing={1} justify='center'>
            <AvatarList />
          </Grid>
          <Grid container item xs={12} sm={2} spacing={1}>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default App;