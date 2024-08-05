import { Link } from "react-router-dom";
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
