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
import { useState } from 'react';
import { IoMdFlame } from 'react-icons/io';
import { TbMessageCircleFilled } from 'react-icons/tb';
import { getLoggedUserId } from '../../../../helper/getLoggedUserId';
import { getTimelineText } from '../../../../helper/getTimelineText';
import { TSortedPosts } from '../../../../types/types';
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
          <CardContent sx={{ p: '4px 16px' }}>
            <Typography variant="body2" sx={{ color: 'var(--main-color)' }}>
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
            <IoMdFlame
              style={{
                color: likedPost[postId] ? (likes.length > 100 ? 'blue' : 'orange') : '',
              }}
            />
          </IconButton>
          <IconButton aria-label="share" onClick={() => setIsCommentOpen(true)}>
            <TbMessageCircleFilled />
          </IconButton>
        </CardActions>
        {likes.length > 0 && (
          <Typography
            sx={{ padding: '0px 16px 8px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '12px' }}
          >
            {likes.length} {likes.length > 1 ? 'likes' : 'like'}{' '}
            {comments.length > 0 ? `and ${comments.length} comments` : ''}
          </Typography>
        )}
      </Card>
    </>
  );
}

export default Post;
