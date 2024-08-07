import { Link } from "react-router-dom";
import { FavoriteBorder as FavoriteBorderIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";

import PostCommentButton from "../PostCommentButton/PostCommentButton";

const PostList = (props) => {
  const user = useContext(AuthedUserContext);

  const handleLike = (postId) => {
    props.handleLikePost(postId);
  };

  const postListItems = props.posts.map((post) => (
    <Card sx={{ maxWidth: 600 }} key={post._id}>
      <CardActionArea>
        <Link
          key={post._id}
          className="card position-relative"
          style={{ width: "18rem", minHeight: "400px" }}
          to={"/posts/" + post._id}
        >
          <CardMedia
            component="img"
            height="140"
            image={post.image || "https://placehold.co/400x300.png"}
            alt="..."
          />
          <CardContent>
            <Typography>{post.content}</Typography>
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
                  console.log(post);
                  handleLike(post._id);
                }}
              />
            </Badge>
          </IconButton>
        )}
        <IconButton>
          <ChatBubbleOutlineIcon color="secondary" />
        </IconButton>
        <PostCommentButton
          handleCommentSubmit={props.handleCommentSubmit}
          comments={post.comments}
          postId={post._id}
        />
      </CardActions>
    </Card>
  ));
  return <main>{postListItems}</main>;
};

export default PostList;
