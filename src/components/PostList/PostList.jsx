import { AuthedUserContext } from "../../App";
import { useContext } from "react";

import PostCommentButton from "../PostCommentButton/PostCommentButton";

import { Link } from "react-router-dom";
import { FavoriteBorder as FavoriteBorderIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  CardActions,
  Typography,
  IconButton,
  Badge,
  CardHeader,
  Avatar,
} from "@mui/material";

const PostList = (props) => {
  const user = useContext(AuthedUserContext);

  const handleLike = (postId) => {
    props.handleLikePost(postId);
  };

  const postListItems = props.posts.map((post) => (
    <Card sx={{ marginBottom: 4 }} key={post._id}>
      <CardActionArea>
        <Link
          key={post._id}
          className="card position-relative"
          style={{ width: "18rem" }}
          to={"/posts/" + post._id}
        >
          <CardHeader
            avatar={
              <Avatar>
                {post.owner.username.substring(0, 1).toUpperCase()}
              </Avatar>
            }
            title={post.owner.username}
            subheader={post.createdAt}
          />
          <Box height="400px">
            <img
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              src={post.image || "https://placehold.co/400x300.png"}
              alt="a balloon"
            />
          </Box>
          <CardContent>
            <Typography>
              {post.content.split(" ").slice(0, 30).join(" ")}...
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {post.likedBy.some((liker) => liker.username === user.username) ? (
          <IconButton>
            <Badge color="secondary" badgeContent={post.likedBy.length}>
              <FavoriteIcon
                color="error"
                onClick={() => {
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
    </Card>
  ));
  return (
    <>
      {props.posts.length === 0
        ? "You haven't created any post yet."
        : postListItems}
    </>
  );
};

export default PostList;
