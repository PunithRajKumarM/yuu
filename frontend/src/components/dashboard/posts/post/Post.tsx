import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
import { red } from '@mui/material/colors';
import { getLoggedUserId } from '../../../../helper/getLoggedUserId';
import { getTimelineText } from '../../../../helper/getTimelineText';
import { TSortedPosts } from '../../../../types/types';
import { useState } from 'react';
import CommentSection from './commentSection/CommentSection';

interface PostProps {
  post: TSortedPosts;
  postTimeStatus: {
    [key: string]: string;
  };
  likedPost: {
    [key: string]: boolean;
  };
  handleLikePost: (postId: string) => void;
}

// post
function Post({ post, postTimeStatus, likedPost, handleLikePost }: PostProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const userId = getLoggedUserId();
  const { id, fullName, profilePicture, postId, link, text, likes, createdAt, comments } = post;
  const timeAgo = postTimeStatus[createdAt] || getTimelineText(Number(createdAt));

  return (
    <>
      <CommentSection post={post} open={isCommentOpen} setOpen={setIsCommentOpen} />
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
          <IconButton aria-label="share" onClick={() => setIsCommentOpen(true)}>
            <CommentIcon />
          </IconButton>
        </CardActions>
        {likes.length > 0 && (
          <Typography sx={{ padding: '0px 16px 8px 16px', color: 'rgba(0, 0, 0, 0.6)' }}>
            {likes.length} {likes.length > 1 ? 'likes' : 'like'}
          </Typography>
        )}
      </Card>
    </>
  );
}

export default Post;
