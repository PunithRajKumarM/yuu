import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Grid2 } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLoggedUserId } from '../../../helper/getLoggedUserId';
import { RootState } from '../../../store/store';
import { TUsersPosts } from '../../../types/types';
import Posts from '../posts/Posts';
import ProfileHeader from './profileHeader/ProfileHeader';
import { useOutletContext } from 'react-router';

// profile
function Profile() {
  const [myPosts, setMyPosts] = useState<TUsersPosts[]>([]);
  const [isPost, setIsPost] = useState<boolean>(false);
  const usersPostsData = useSelector((state: RootState) => state.usersPostsData);
  const { value: allPosts } = usersPostsData;
  const userId = getLoggedUserId();
  const { isUsersPostsLoading }: { isUsersPostsLoading: boolean } = useOutletContext();

  useEffect(() => {
    if (userId && allPosts) {
      const loggedUserPost = allPosts.filter((user) => user.id === userId);
      const isMyPostAvailable = !!loggedUserPost.find((l) => l.posts.length);
      setMyPosts(loggedUserPost);
      setIsPost(isMyPostAvailable);
    }
  }, [allPosts, userId, usersPostsData]);

  return (
    <Grid2 container flexDirection={'column'} spacing={2} height={'100%'}>
      <ProfileHeader />
      <Grid2
        container
        flexDirection={'column'}
        spacing={3}
        flex={Number(isPost)}
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!isUsersPostsLoading &&
          (myPosts.length && isPost ? <Posts posts={myPosts} /> : <span>No post</span>)}
      </Grid2>
    </Grid2>
  );
}

export default Profile;
