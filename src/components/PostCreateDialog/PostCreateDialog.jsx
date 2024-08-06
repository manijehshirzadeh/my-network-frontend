import { useState } from "react";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Textarea from "@mui/joy/Textarea";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Input } from "@mui/material";

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

  const [isPublic, setIsPublic] = useState(true);
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setIsPublic(event.target.checked);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setContent("");
    setImage("");
    setIsPublic(true);
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
        console.log("data.url", data.url);
        // setFormData({ ...formData, image: data.url });
        imageUrl = data.url;
      } else {
        setImage("");
      }
      // formData._id = id;
      await props.handleSubmit({ content, isPublic, image: imageUrl });
      handleClose();
      // setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create a New Post
      </Button>
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
          <label className="form-label">Image</label>
          <Input
            onChange={handleImageSelect}
            type="file"
            name="image"
            className="form-control"
          />
          <Textarea
            placeholder="Type in here…"
            defaultValue=""
            minRows={10}
            maxRows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isPublic}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              labelPlacement="start"
              label="Is Public?"
            />
          </FormGroup>
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
