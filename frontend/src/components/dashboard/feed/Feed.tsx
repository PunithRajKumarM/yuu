import { Button, Grid2 } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PostContext } from '../../../context/PostContext';
import { getGreeting, nextUpdateTime } from '../../../helper/getGreeting';
import { RootState } from '../../../store/store';
import Posts from '../posts/Posts';

// feed
function Feed() {
  const [greeting, setGreeting] = useState(getGreeting());
  const loggedUserData = useSelector((state: RootState) => state.loggedUserData);
  const navigate = useNavigate();
  const { value } = loggedUserData;
  const { setOpen } = useContext(PostContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGreeting(getGreeting());
    }, nextUpdateTime());
    return () => clearInterval(intervalId);
  }, [greeting]);

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
        >{`${greeting}, ${value?.fullName}`}</span>
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
        spacing={3}
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          alignItems: 'center',
        }}
      >
        <span>Your feed looks empty! Start by connecting with others.</span>
        <Button
          sx={{
            color: 'var(--main-color)',
            borderColor: 'var(--main-color)',
            fontWeight: '600',
          }}
          size="small"
        >
          <span>Find friends</span>
        </Button>
        <Posts />
      </Grid2>
    </Grid2>
  );
}

export default Feed;
