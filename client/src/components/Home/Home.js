import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts.js";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import useStyles from "./styles";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [sort, setSort] = useState("newest");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    dispatch(getPosts(sort));
  }, [currentId, sort, dispatch]);

  return (
    <div>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form
                currentId={currentId}
                setCurrentId={setCurrentId}
                sort={sort}
              />
              <Paper style={{ marginTop: "20px" }}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="sort-select">Sort Posts</InputLabel>
                  <Select
                    labelId="sort-select"
                    id="sort"
                    value={sort}
                    onChange={handleChange}
                  >
                    <MenuItem value={"newest"}>Newest</MenuItem>
                    <MenuItem value={"oldest"}>Oldest</MenuItem>
                    <MenuItem value={"most-likes"}>Most Likes</MenuItem>
                    <MenuItem value={"least-likes"}>Least Likes</MenuItem>
                  </Select>
                  <FormHelperText>Sort posts by:</FormHelperText>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
