import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core"
import Posts from "./components/Posts/Posts.js";
import Form from "./components/Form/Form.js";
import usestyles from "./styles.js"

import instaverse from './images/instaverse.png'

const App = () => {
  const classes = usestyles()

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center"> Instaverse </Typography>
        <img className={classes.image} src={instaverse} alt="instaverse" height="60"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={4}>
            <Grid item xs={12} sm={7}>
              <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
};

export default App
