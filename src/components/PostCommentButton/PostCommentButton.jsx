import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  DialogTitle,
  IconButton,
  List,
  Badge,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

export default function PostCommentButton(props) {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(comment, props.postId);
    await props.handleCommentSubmit(comment, props.postId);
    setComment("");
  };

  return (
    <>
      <IconButton>
        <Badge color="secondary" badgeContent={props.comments.length}>
          <ChatBubbleOutlineIcon onClick={handleClickOpen} color="secondary" />
        </Badge>
      </IconButton>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.comments.length !== 0 && (
              <List sx={{ mb: 2 }}>
                {props.comments.map(({ content, owner, _id }) => (
                  <Fragment key={_id}>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={"person"} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={owner ? owner.username : "Unknown"}
                        secondary={content}
                      />
                    </ListItemButton>
                  </Fragment>
                ))}
              </List>
            )}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Enter your comment here"
            fullWidth
            variant="standard"
            value={comment}
            onChange={handleCommentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            Comment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
