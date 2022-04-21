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
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPosts, getPostsBySearch } from "../../actions/posts.js";
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import Paginate from "../Paginate/Paginate.js";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState("1");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get("searchQuery");

  useEffect(() => {
    dispatch(getPosts(sort, page));
  }, [currentId, sort, page, dispatch]);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleRemoveTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim().length || tags.length) {
      //dispatch => fetch search posts
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      //dispatch => fetch posts
      dispatch(getPosts(sort, page));
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
      searchPost();
    }
  };

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
            <Grid item xs={12} sm={6} md={8}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search by title"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <ChipInput
                  style={{ margin: "10px 0 " }}
                  value={tags}
                  onAdd={handleAddTag}
                  onDelete={handleRemoveTag}
                  label="Search tags"
                  variant="outlined"
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  color="primary"
                  variant="contained"
                >
                  Search
                </Button>
              </AppBar>
              <Paper style={{ margin: "1rem 0 1rem 0" }} elevation={6}>
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
              <Form
                currentId={currentId}
                setCurrentId={setCurrentId}
                sort={sort}
                page={page}
              />
              <Paper style={{ marginTop: "20px" }} elevation={6}>
                <Paginate setPage={setPage} page={page} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
