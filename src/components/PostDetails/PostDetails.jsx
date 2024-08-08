import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostEditionDialog from "../PostEditionDialog/PostEditionDialog";
import PostDeletionDialog from "../PostDeletionDialog/PostDeletionDialog";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteBorder as FavoriteBorderIcon } from "@mui/icons-material";
import PostCommentButton from "../PostCommentButton/PostCommentButton";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";

import * as postService from "../../services/postService";

import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  Badge,
  Box,
  Avatar,
} from "@mui/material";

const PostDetails = (props) => {
  const user = useContext(AuthedUserContext);

  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const post = await postService.show(id);
    setPost(post);
  };

  const handleLike = (postId) => {
    props.handleLikePost(postId);
    fetchPost();
  };

  if (post === null) {
    return <>Loading...</>;
  }

  return (
    <Card sx={{ maxWidth: "100%" }} key={post._id} to={`/posts/${post._id}`}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar>{post.owner.username.substring(0, 1).toUpperCase()}</Avatar>
          }
          title={post.owner.username}
          subheader={post.createdAt}
        />
        <Box height="400px">
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={post.image || "https://placehold.co/400x400.png"}
            alt="a balloon"
          />
        </Box>
        <CardContent>
          <Typography>{post.content}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          flexGrow={1}
          alignItems="flex-end"
        >
          <Box>
            <CardActions sx={{ pl: 0 }}>
              {post.likedBy.some(
                (liker) => liker.username === user.username
              ) ? (
                <IconButton>
                  <Badge color="secondary" badgeContent={post.likedBy.length}>
                    <FavoriteIcon
                      color="error"
                      onClick={() => {
                        console.log(post);
                        handleLike(post._id);
                      }}
                    />
                  </Badge>
                </IconButton>
              ) : (
                <IconButton>
                  <Badge color="secondary" badgeContent={post.likedBy.length}>
                    <FavoriteBorderIcon
                      color="primary"
                      onClick={() => {
                        handleLike(post._id);
                      }}
                    />
                  </Badge>
                </IconButton>
              )}
              <PostCommentButton
                handleCommentSubmit={props.handleCommentSubmit}
                comments={post.comments}
                postId={post._id}
              />
            </CardActions>
          </Box>

          {post.owner._id === user._id && (
            <Box>
              <PostEditionDialog
                post={post}
                handleSubmit={(editedPost) => {
                  props.handlePostEdit(id, editedPost);
                  fetchPost();
                }}
              />
              <PostDeletionDialog
                handleDelete={() => props.handlePostDelete(post._id)}
              />
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostDetails;
