import React from 'react';
import Appbar from './components/Appbar';
import AvatarList from './components/AvatarList';
import Grid from '@material-ui/core/Grid';

const App = () => {
  return (
    <>

      <Grid container>

        <Grid item xs={12} sm={12}>
          <Appbar />
        </Grid>

        <Grid item xs={12} sm={2} />

        <Grid item xs={12} sm={8}>
          <AvatarList />
        </Grid>

        <Grid item xs={12} sm={2} />

      </Grid>
    </>
  );
};

export default App;