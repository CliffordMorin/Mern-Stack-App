import React, { useState } from "react";
import usestyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Dialog,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import Comment from "../Comment/Comment";

import { deletePost, likePost, openForm } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = usestyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);

  const [openImg, setOpenImg] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenImg = () => {
    setOpenImg(true);
  };

  const handleCloseImg = () => {
    setOpenImg(false);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  //made user id a variable in order to make code more readable
  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
        onClick={handleOpenImg}
        component="div"
      ></CardMedia>
      <Dialog
        open={openImg}
        onClose={handleCloseImg}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <img
            src={post.selectedFile}
            alt="post modal"
            className={classes.dialogImg}
          />
        </div>
      </Dialog>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {userId === post?.creator && (
          <div>
            <Tooltip title="Edit or Delete Post" placement="top" arrow>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClickMenu}
                style={{ color: "white" }}
              >
                <MoreHorizIcon />
              </Button>
            </Tooltip>
            <Menu
              id="simple-menu"
              classes={{ paper: classes.menu }}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleCloseMenu}>
                <Tooltip title="Delete Post" placement="top" arrow>
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      dispatch(deletePost(post._id));
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Tooltip title="Edit Post" placement="bottom" arrow>
                  <Button
                    style={{ color: "white", backgroundColor: "green" }}
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setCurrentId(post._id);
                      dispatch(openForm());
                      window.scrollTo(0, 0);
                    }}
                  >
                    <EditIcon fontSize="medium" />
                  </Button>
                </Tooltip>
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        <Comment post={post} />
      </CardActions>
    </Card>
  );
};

export default Post;
