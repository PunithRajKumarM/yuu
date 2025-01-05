import { ApolloQueryResult, OperationVariables, useMutation } from '@apollo/client';
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
import { LoaderContext } from '../../../context/LoaderContext';
import Loader from '../../loader/Loader';
import { handleImageSelection } from '../../../helper/handleImageSelection';

export interface ICreatePostProps {
  refetchUsersPosts: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// create post
function CreatePost({ refetchUsersPosts }: ICreatePostProps) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [text, setText] = useState('');
  const userId = getLoggedUserId();
  const { open: openPost, setOpen: setOpenPost } = useContext(PostContext);
  const { open: openLoader, setOpen: setOpenLoader } = useContext(LoaderContext);
  const { enqueueSnackbar } = useSnackbar();

  const [savePost] = useMutation(SAVE_POST, {
    onCompleted: ({ save_post }) => {
      const { message } = save_post;
      setImage(null);
      setText('');
      refetchUsersPosts();
      setOpenLoader(false);
      setOpenPost(false);
      enqueueSnackbar(message, { variant: 'success' });
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, { variant: 'error' });
      setOpenLoader(false);
    },
  });

  const handlePostSubmit = () => {
    if (!(text.trim() || image))
      return enqueueSnackbar(ErrorsList.EMPTY_POST, { variant: 'error' });
    setOpenLoader(true);
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
    setOpenPost(false);
  };

  return (
    <Dialog
      fullScreen
      open={openPost}
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
      <Loader open={openLoader} />
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
            onChange={(e) => handleImageSelection(e, setImage)}
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
