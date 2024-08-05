import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

const PostList = (props) => {
  const postListItems = props.posts.map((post) => (
    <Card sx={{ maxWidth: 345 }} key={post._id} to={`/posts/${post._id}`}>
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
        <Button size="small" color="primary">
          Comments
        </Button>
        <Button size="small" color="primary">
          Like
        </Button>
      </CardActions>
    </Card>
  ));
  return <main>{postListItems}</main>;
};

export default PostList;
