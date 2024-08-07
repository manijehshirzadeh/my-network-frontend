import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Dialog, Chip, DialogContent, DialogActions } from "@mui/material";

import Textarea from "@mui/joy/Textarea";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PostEditionDialog(props) {
  const [content, setContent] = useState(props.post.content);

  const [isPublic, setIsPublic] = useState(props.post.isPublic);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setContent("");

    setIsPublic(true);
  };

  const handlePostCreate = async (event) => {
    event.preventDefault();

    try {
      await props.handleSubmit({ content, isPublic, image: props.post.image });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Chip
        size="small"
        sx={{ mb: 2.5 }}
        color="success"
        onClick={handleClickOpen}
        label="Edit"
      />
      <BootstrapDialog
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <Textarea
            name="content"
            placeholder="Type in here…"
            minRows={10}
            maxRows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePostCreate}>
            Update Post
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
