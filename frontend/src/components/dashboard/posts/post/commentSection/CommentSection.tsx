import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Box,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { LoaderContext } from '../../../../../context/LoaderContext';
import { getLoggedUserId } from '../../../../../helper/getLoggedUserId';
import { getTimelineText } from '../../../../../helper/getTimelineText';
import { ADD_COMMENT } from '../../../../../queries/queries';
import { TRefetch, TSortedPosts } from '../../../../../types/types';
import Loader from '../../../../loader/Loader';
import { useOutletContext } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { IUserData } from '../../../../../interfaces/interfaces';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CommentSectionProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: TSortedPosts;
}

export default function CommentSection({ open, setOpen, post }: CommentSectionProps) {
  const [commentMessage, setCommentMessage] = useState('');
  const { open: openLoader, setOpen: setLoaderOpen } = useContext(LoaderContext);
  const userId = getLoggedUserId();
  const { postId, comments, profilePicture, fullName } = post;
  const { refetchUsersPosts }: { refetchUsersPosts: TRefetch } = useOutletContext();
  const allUsersData = useSelector((state: RootState) => state.allUsersData);
  const { value } = allUsersData;

  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      refetchUsersPosts();
      setLoaderOpen(false);
      setCommentMessage('');
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, { variant: 'error' });
      setLoaderOpen(false);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleComment = () => {
    if (postId && userId && commentMessage) {
      setLoaderOpen(true);
      addComment({
        variables: {
          postId,
          userId,
          comment: commentMessage,
        },
      });
    }
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          position: 'relative',
          maxWidth: '600px',
          margin: 'auto', // Centers the dialog horizontally and vertically
          top: 0, // Reset positioning
          transform: 'translate(0, 0)', // Resets transform for better alignment
          height: '80%',
        },
      }}
      fullScreen
      open={open}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: 'relative',
          // minWidth: { md: '600px', sm: '400px' },
          backgroundColor: 'var(--main-color)',
        }}
      >
        <Loader open={openLoader} />
        <Toolbar>
          <Typography sx={{ m: 'auto' }} variant="h6" component="div">
            Comments
          </Typography>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack
        flex={1}
        className={'hideScrollbar'}
        sx={{
          overflowX: 'hidden',
          overflowY: 'scroll',
        }}
      >
        {comments.length > 0 ? (
          <>
            {comments.map((c) => {
              const commentedUser = value?.find((u) => u.id === c.user.id);

              return (
                <Box key={c.id} sx={{
                  boxShadow: '1px 0 0 black'
                }}>
                  <Grid2 container alignItems={'center'} spacing={2} p={1}>
                    <Avatar
                      src={commentedUser?.profilePicture || commentedUser?.fullName}
                      sx={{ width: '30px', height: '30px' }}
                      aria-label="post"
                      alt={commentedUser?.fullName}
                    />
                    <Grid2 container flexDirection={'column'} spacing={0}>
                      <Box>
                        <strong>
                          <span>{commentedUser?.fullName}</span>
                        </strong>
                        <small style={{ marginLeft: '8px' }}>
                          <span>{getTimelineText(Number(c.createdAt))}</span>
                        </small>
                      </Box>
                      <Box>
                        <span>{c.comment}</span>
                      </Box>
                    </Grid2>
                  </Grid2>
                </Box>
              );
            })}
          </>
        ) : (
          <span style={{ color: 'var(--main-color)', textAlign: 'center', padding: '10px' }}>
            No comments
          </span>
        )}
        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            padding: '10px',
            mt: 'auto',
          }}
        >
          <InputLabel htmlFor="comment"></InputLabel>
          <OutlinedInput
            value={commentMessage}
            sx={{ color: 'var(--main-color)' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleComment();
              }
            }}
            onChange={(e) => setCommentMessage(e.target.value)}
            id="comment"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleComment} disabled={!commentMessage} edge="end">
                  <SendIcon sx={{ color: commentMessage ? 'var(--main-color)' : 'grey' }} />
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </FormControl>
      </Stack>
    </Dialog>
  );
}
