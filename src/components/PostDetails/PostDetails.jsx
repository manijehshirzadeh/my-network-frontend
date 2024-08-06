import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PostEditionDialog from "../PostEditionDialog/PostEditionDialog";

import * as postService from "../../services/postService";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

const PostDetails = (props) => {
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const post = await postService.show(id);
    console.log("post", post);
    setPost(post);
  };
    fetchPost();
  }, [id]);

  console.log("post state:", post);

  if (post === null) {
    return <main>Loading...</main>;
  }

  return (
    <Card sx={{ maxWidth: "100%" }} key={post._id} to={`/posts/${post._id}`}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={post.image || "https://placehold.co/400x300.png"}
          alt="..."
        />
        <CardContent>
          <Typography>{post.content}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box gap={1} display={"flex"} justifyContent="space-between">
          <Box>
            <Button
              size="small"
              disableElevation
              variant="contained"
              color="primary"
            >
              Comment
            </Button>
            <Button
              size="small"
              variant="contained"
              disableElevation
              color="secondary"
            >
              Like
            </Button>
          </Box>
          <Box>
            <PostEditionDialog
              post={post}
              handleSubmit={(editedPost) => {
                props.handlePostEdit(id, editedPost);
                fetchPost();
              }}
            />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostDetails;
