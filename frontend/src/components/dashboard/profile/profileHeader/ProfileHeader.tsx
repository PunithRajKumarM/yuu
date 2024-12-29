import { Avatar, Box, Button, Grid2 } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useContext } from 'react';
import { PostContext } from '../../../../context/PostContext';

// profile header
function ProfileHeader() {
  const loggedUserData = useSelector((state: RootState) => state.loggedUserData);
  const { value } = loggedUserData;
  const { setOpen } = useContext(PostContext);

  const profileStatsLabels = ['Posts', 'Followers', 'Following'];
  return (
    <Grid2
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
      container
      spacing={5}
    >
      <Grid2>
        <Avatar
          alt={value?.fullName}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 150, height: 150 }}
        />
      </Grid2>
      <Grid2 sx={{ flexGrow: 1, color: 'var(--main-color)' }}>
        <Grid2>
          <Box>
            <h1>{value?.fullName}</h1>
          </Box>
          <Box>
            <span>{`@${value?.userName}`}</span>
          </Box>
        </Grid2>
        <Grid2 container spacing={5} marginTop={1}>
          {profileStatsLabels.map((d, i) => (
            <Box
              key={i}
              sx={{
                textAlign: 'center',
              }}
            >
              <Box>
                <span>{d}</span>
              </Box>
              <span>10</span>
            </Box>
          ))}
        </Grid2>
      </Grid2>
      <Grid2>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            color: 'white',
            backgroundColor: 'var(--main-color)',
            borderColor: 'var(--main-color)',
            transition: 'all 500ms linear',
            ':hover': { color: 'white', backgroundColor: '#576cbd' },
          }}
          variant="outlined"
          size="small"
        >
          Create post
        </Button>
      </Grid2>
    </Grid2>
  );
}

export default ProfileHeader;
