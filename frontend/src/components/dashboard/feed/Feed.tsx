import { Button, Grid2 } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router';
import { PostContext } from '../../../context/PostContext';
import { getGreeting, nextUpdateTime } from '../../../helper/getGreeting';
import { getLoggedUserId } from '../../../helper/getLoggedUserId';
import { RootState } from '../../../store/store';
import { TUsersPosts } from '../../../types/types';
import Posts from '../posts/Posts';

// feed
function Feed() {
  const [feedPosts, setFeedPosts] = useState<TUsersPosts[]>([]);
  const [greeting, setGreeting] = useState(getGreeting());
  const loggedUserData = useSelector((state: RootState) => state.loggedUserData);
  const usersPostsData = useSelector((state: RootState) => state.usersPostsData);
  const userFollowings = useSelector((state: RootState) => state.userRelationships);
  const { value: allPosts } = usersPostsData;
  const { setOpen } = useContext(PostContext);
  const navigate = useNavigate();
  const userId = getLoggedUserId();
  const feedsCondition = feedPosts.length && userFollowings.followings.length;
  const { isUsersPostsLoading }: { isUsersPostsLoading: boolean } = useOutletContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGreeting(getGreeting());
    }, nextUpdateTime());
    return () => clearInterval(intervalId);
  }, [greeting]);

  useEffect(() => {
    if (allPosts?.length && userFollowings.followings.length && userId) {
      const posts = allPosts
        .filter(
          (post) =>
            post.posts.length && (userFollowings.followings.includes(post.id) || post.id === userId)
        )
        .map((user) => ({
          ...user,
          posts: [...user.posts].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)),
        }));

      if (posts.length) setFeedPosts(posts);
    }
  }, [allPosts, userFollowings, userId]);

  const handleFeedPostData = () => {
    if (!isUsersPostsLoading) {
      if (feedsCondition) {
        return <Posts posts={feedPosts} />;
      } else if (!feedsCondition) {
        return <span>No posts available, Be first to share your post</span>;
      }
      return (
        <>
          <span>Your feed looks empty! Start by connecting with others.</span>
          <Button
            sx={{
              color: 'var(--main-color)',
              borderColor: 'var(--main-color)',
              fontWeight: '600',
            }}
            size="small"
            onClick={() => navigate('search')}
          >
            <span>Find friends</span>
          </Button>
        </>
      );
    }
  };

  return (
    <Grid2
      container
      spacing={2}
      flexDirection={'column'}
      sx={{
        height: '100%',
        width: '100%',
        color: 'var(--main-color)',
      }}
    >
      <Grid2
        container
        flexDirection={'column'}
        spacing={2}
        sx={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '10px',
        }}
      >
        <span
          style={{
            fontWeight: '500',
          }}
        >{`${greeting}, ${loggedUserData.value?.fullName}`}</span>
        <Grid2 container alignItems={'center'} justifyContent={'center'}>
          <span>Got something to share? Write it, snap it, or share it!</span>
          <Button
            sx={{
              color: 'var(--main-color)',
              borderColor: 'var(--main-color)',
              fontWeight: '600',
            }}
            size="small"
            onClick={() => setOpen(true)}
          >
            <span>Create post</span>
          </Button>
        </Grid2>
      </Grid2>
      <Grid2
        container
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={3}
        flex={Number(Boolean(feedsCondition))}
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        {handleFeedPostData()}
      </Grid2>
    </Grid2>
  );
}

export default Feed;
