import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Button, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Dialog, Box } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Textarea from "@mui/joy/Textarea";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PostCreateDialog(props) {
  const [image, setImage] = useState("");

  const [content, setContent] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setContent("");
    setImage("");
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "react-cloudinary");
    data.append("cloud_name", "djaedfrag");
    return fetch("https://api.cloudinary.com/v1_1/djaedfrag/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleImageSelect = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePostCreate = async (event) => {
    event.preventDefault();
    let imageUrl = "";
    try {
      if (image) {
        const data = await uploadImage(image);
        imageUrl = data.url;
      } else {
        setImage("");
      }

      await props.handleSubmit({ content, image: imageUrl });
      handleClose();
      // setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        onClick={handleClickOpen}
        sx={{ height: 60, transform: "translateZ(0px)", flexGrow: 1 }}
      >
        <Chip
          icon={<AddIcon />}
          sx={{ position: "absolute", right: 16, top: 80 }}
          size="32"
          color="primary"
          onClick={handleClickOpen}
          label="Create a New Post"
        />
      </Box>
      <BootstrapDialog
        fullWidth
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Creating a new post
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <input
            onChange={handleImageSelect}
            type="file"
            name="image"
            className="form-control"
          />
          <Textarea
            placeholder="Type in here…"
            minRows={10}
            maxRows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={handlePostCreate}>
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
