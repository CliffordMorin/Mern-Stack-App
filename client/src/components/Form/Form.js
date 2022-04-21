import React, { useState, useEffect } from "react";
import usestyles from "./styles.js";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Fab,
  Dialog,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import {
  createPost,
  updatePost,
  getPosts,
  openForm,
  closeForm,
} from "../../actions/posts";
import { useSelector } from "react-redux";

//get current id of the post we are on

const Form = ({ currentId, setCurrentId, sort, page }) => {
  const classes = usestyles();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();
  //get the user from local storage so we can get the name of the user for posting on handleSubmit
  const user = JSON.parse(localStorage.getItem("profile"));
  //finds the specific post to update and populates the input fields with the post to update it
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const isOpen = useSelector((state) => state.posts.isFormOpen);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleClickOpen = () => {
    dispatch(openForm());
  };

  const handleClose = () => {
    dispatch(closeForm());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData.tags = postData.tags.map((tag) =>
      tag.replace(/\s/g, "").toLowerCase()
    );
    console.log(postData.tags);
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      dispatch(getPosts(sort, page));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own posts and like other's posts.
        </Typography>
      </Paper>
    );
  }

  return (
    <div>
      <Tooltip title="Create Post" aria-label="create post" arrow>
        <Fab
          onClick={handleClickOpen}
          style={{ color: "white", backgroundColor: "green" }}
          aria-label="add"
          size="large"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Paper className={classes.paper} elevation={6}>
          <form
            autoComplete="off"
            noValidate
            className={`${classes.form} ${classes.root}`}
            onSubmit={handleSubmit}
          >
            <Typography
              variant="h4"
              style={currentId ? { color: "green" } : { color: "red" }}
            >
              {" "}
              {currentId ? "Editing" : "Creating"} a Post
            </Typography>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              required
              fullWidth
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <TextField
              name="message"
              variant="outlined"
              label="Message"
              required
              fullWidth
              multiline
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
            <TextField
              name="tags"
              variant="outlined"
              label="Tags"
              placeholder="yolo,swag,livin,etc...no spaces"
              fullWidth
              value={postData.tags}
              onChange={(e) => {
                setPostData({
                  ...postData,
                  tags: e.target.value.split(","),
                });
              }}
            />
            <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              onClick={handleClose}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Paper>
      </Dialog>
    </div>
  );
};

export default Form;
