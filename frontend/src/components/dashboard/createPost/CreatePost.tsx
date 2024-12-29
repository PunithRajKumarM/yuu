import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid2,
  IconButton,
  List,
  Slide,
  TextField,
  Toolbar,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar } from 'notistack';
import React, { forwardRef, useContext, useState } from 'react';
import { PostContext } from '../../../context/PostContext';
import { ErrorsList } from '../../../helper/ErrorsLists';
import { getLoggedUserId } from '../../../helper/getLoggedUserId';
import { SAVE_POST } from '../../../queries/queries';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// create post
function CreatePost() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [text, setText] = useState('');
  const userId = getLoggedUserId();
  const { open, setOpen } = useContext(PostContext);
  const { enqueueSnackbar } = useSnackbar();

  const [savePost] = useMutation(SAVE_POST, {
    onCompleted: ({ save_post }) => {
      const { message } = save_post;
      setImage(null);
      setText('');
      console.log(save_post);
      enqueueSnackbar(message, { variant: 'success' });
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0] || null;
    if (!selectedImage) return enqueueSnackbar(ErrorsList.UNSUPPORTED_FORMAT, { variant: 'error' });

    if (!selectedImage.type.startsWith('image/'))
      return enqueueSnackbar(ErrorsList.ONLY_IMAGE, { variant: 'error' });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handlePostSubmit = () => {
    if (!(text.trim() || image))
      return enqueueSnackbar(ErrorsList.EMPTY_POST, { variant: 'error' });

    savePost({
      variables: {
        id: userId,
        text,
        image,
      },
    });
    return;
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          backgroundColor: 'whitesmoke',
        },
      }}
    >
      <AppBar sx={{ position: 'relative', backgroundColor: 'var(--main-color)' }}>
        <Toolbar
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={handleClose} edge="start" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
          <Button onClick={handlePostSubmit} color="inherit">
            Post
          </Button>
        </Toolbar>
      </AppBar>
      <List
        sx={{
          padding: '20px',
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Got something to share? Write it, snap it, or share it!"
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{
            mr: 'auto',
            backgroundColor: 'var(--main-color)',
          }}
        >
          <span>Add photo</span>
          <input
            type="file"
            accept="image/*"
            aria-hidden="true"
            hidden
            onChange={(e) => handleImageSelection(e)}
          />
        </Button>
        {image && (
          <Grid2 container flexDirection={'column'} spacing={2}>
            <Box
              sx={{
                backgroundImage: `url(${image})`,
                padding: '100px',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <Button
              onClick={() => setImage(null)}
              sx={{
                placeSelf: 'flex-start',
                color: 'red',
              }}
            >
              <span>Remove Photo</span>
            </Button>
          </Grid2>
        )}
      </List>
    </Dialog>
  );
}

export default CreatePost;
