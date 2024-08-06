import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Textarea from "@mui/joy/Textarea";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

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
      <Button
        size="small"
        variant="contained"
        disableElevation
        color="success"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
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
          <Button autoFocus onClick={handlePostCreate}>
            Update Post
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
