import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import React from 'react';
import { getLoggedUserId } from '../../../../helper/getLoggedUserId';
import { TPosts, TUsersPosts } from '../../../../types/types';

// post
function Post({
  userPost,
  post,
  timeAgo,
  likedPost,
  handleLikePost,
}: {
  userPost: TUsersPosts;
  post: TPosts;
  timeAgo: string;
  likedPost: {
    [key: string]: boolean;
  };
  handleLikePost: (postId: string) => void;
}) {
  const { id, fullName, profilePicture } = userPost;
  const { id: postId, link, text, likes, comments } = post;

  const userId = getLoggedUserId();

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar
            src={profilePicture || fullName}
            sx={{ bgcolor: red[900] }}
            aria-label="post"
            alt={fullName}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={id === userId ? 'You' : fullName}
        subheader={timeAgo}
      />
      {text && text.length > 0 && (
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {text}
          </Typography>
        </CardContent>
      )}
      {link && (
        <CardMedia
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
          component="img"
          image={link}
          alt="demo"
        />
      )}

      <CardActions
        disableSpacing
        sx={{
          pb: likes.length > 0 ? 0 : '8px',
        }}
      >
        <IconButton aria-label="add to favorites" onClick={() => handleLikePost(postId)}>
          <FavoriteIcon
            sx={{
              color: likedPost[postId] ? 'red' : '',
            }}
          />
        </IconButton>
        <IconButton aria-label="share">
          <CommentIcon />
        </IconButton>
      </CardActions>
      {likes.length > 0 && (
        <Typography sx={{ padding: '0px 16px', color: 'rgba(0, 0, 0, 0.6)' }}>
          {likes.length} {likes.length > 1 ? 'likes' : 'like'}
        </Typography>
      )}
    </Card>
  );
}

export default Post;
