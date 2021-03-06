import React, { useState, useRef } from "react";
import useStyles from "./styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  Typography,
  Divider,
  Tooltip,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import CommentIcon from "@material-ui/icons/Comment";

import { commentPost } from "../../../actions/posts";

const Comment = ({ post }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment("");

    commentsRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div>
      <Tooltip title="View Comments" arrow placement="top">
        <Button onClick={handleClickOpen}>
          <CommentIcon color="primary" />
        </Button>
      </Tooltip>
      <Dialog
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h5">Comments</Typography>
        </DialogTitle>
        <DialogContent>
          <div>
            <DialogContentText gutterBottom>
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <Typography key={i} gutterBottom variant="subtitle1">
                    <strong>{c.split(":")[0]}</strong>: {c.split(":")[1]}
                    <Divider />
                  </Typography>
                ))
              ) : (
                <Typography variant="subtitle1">
                  No comments yet. Be the first to comment!
                </Typography>
              )}
              <div ref={commentsRef} />
            </DialogContentText>
          </div>
        </DialogContent>
        <DialogActions>
          {(user?.result?.googleId || user?.result?._id) && (
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="Write a Comment"
              type="text"
              variant="outlined"
              placeholder="Wow! This is the best post ever!"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          )}
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {(user?.result?.googleId || user?.result?._id) && (
            <Button onClick={handleSubmit} color="primary" disabled={!comment}>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Comment;
