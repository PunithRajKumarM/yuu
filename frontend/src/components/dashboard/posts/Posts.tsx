import { useMutation } from '@apollo/client';
import { Grid2 } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';
import { nextUpdateTime } from '../../../helper/getGreeting';
import { getLoggedUserId } from '../../../helper/getLoggedUserId';
import { getTimelineText } from '../../../helper/getTimelineText';
import { LIKE_POST } from '../../../queries/queries';
import { RootState } from '../../../store/store';
import { TRefetch, TSortedPosts, TUsersPosts } from '../../../types/types';
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
  const [sortedPost, setSortedPost] = useState<TSortedPosts[]>([]);

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
          updatedPostTimes[key] = getTimelineText(Number(key));
        });
        return updatedPostTimes;
      });
    }, nextUpdateTime());

    return () => clearInterval(interval);
  }, [postTimeStatus]);

  useEffect(() => {
    if (posts && posts.length) {
      const combinedPost: TSortedPosts[] = [];
      posts.forEach((user) => {
        user.posts.forEach((post) => {
          combinedPost.push({
            id: user.id,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
            postId: post.id,
            link: post.link,
            text: post.text,
            createdAt: post.createdAt,
            likes: post.likes,
            comments: post.comments,
          });
        });
      });
      combinedPost.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
      setSortedPost(combinedPost);
    }
  }, [posts]);

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
      {sortedPost.map((post, pi) => {
        return (
          <Post
            key={pi}
            post={post}
            postTimeStatus={postTimeStatus}
            likedPost={likedPost}
            handleLikePost={handleLikePost}
          />
        );
      })}
    </Grid2>
  );
}
