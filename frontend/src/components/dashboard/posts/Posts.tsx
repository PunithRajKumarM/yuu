import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { useMutation } from '@apollo/client';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';
import { nextUpdateTime } from '../../../helper/getGreeting';
import { getLoggedUserId } from '../../../helper/getLoggedUserId';
import { getPostTimeline } from '../../../helper/getPostTimeline';
import { LIKE_POST } from '../../../queries/queries';
import { RootState } from '../../../store/store';
import { TRefetch, TUsersPosts } from '../../../types/types';
import { Grid2 } from '@mui/material';
import Post from './post/Post';

interface IProps {
  posts: TUsersPosts[];
}

// post
export default function Posts({ posts }: IProps) {
  const [commentedPost, setCommentedPost] = useState(false);
  const { refetchUsersPosts }: { refetchUsersPosts: TRefetch } = useOutletContext();
  const [postTimeStatus, setPostTimeStatus] = useState<{ [key: string]: string }>({});
  const [likedPost, setLikedPost] = useState<{ [key: string]: boolean }>({});

  const userId = getLoggedUserId();
  const { value: postStateValue } = useSelector((state: RootState) => state.usersPostsData);

  const [likePost] = useMutation(LIKE_POST, {
    onCompleted: ({ like_post }) => {
      const { message } = like_post;
      // enqueueSnackbar(message, { variant: 'success' });
      refetchUsersPosts();
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  useEffect(() => {
    if (postStateValue) {
      const initialLikedState: Record<string, boolean> = {};
      postStateValue.forEach((user) => {
        user.posts.forEach((post) => {
          const isLiked = post.likes.some((like) => like.user.id === userId);
          initialLikedState[post.id] = isLiked;
        });
      });
      setLikedPost(initialLikedState);
    }
  }, [postStateValue, userId]);

  const handleLikePost = (postId: string) => {
    if (userId && postId) {
      const isLiked = likedPost[postId];
      setLikedPost((prev) => ({
        ...prev,
        [postId]: !isLiked,
      }));
      likePost({
        variables: {
          id: userId,
          postId,
        },
      });
    }
    return;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPostTimeStatus((previousPostTime) => {
        const updatedPostTimes = { ...previousPostTime };
        Object.keys(previousPostTime).forEach((key) => {
          updatedPostTimes[key] = getPostTimeline(Number(key));
        });
        return updatedPostTimes;
      });
    }, nextUpdateTime());

    return () => clearInterval(interval);
  }, [postTimeStatus]);

  return (
    <Grid2
      container
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      flex={1}
      spacing={3}
      width={'auto'}
      flexWrap={'wrap'}
    >
      {posts &&
        posts.length &&
        posts.map((u, ui) => {
          const { posts } = u as TUsersPosts;
          if (!posts || !posts.length) return null;
          const sortedPosts = [...posts].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          return sortedPosts.map((p, pi) => {
            const { createdAt } = p;
            const timeAgo = postTimeStatus[createdAt] || getPostTimeline(Number(createdAt));
            return (
              <Post
                key={`${ui}-${pi}`}
                userPost={u}
                post={p}
                timeAgo={timeAgo}
                likedPost={likedPost}
                handleLikePost={handleLikePost}
              />
            );
          });
        })}
    </Grid2>
  );
}
