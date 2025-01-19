import { Box, Grid2 } from '@mui/material';
import { Outlet, useOutletContext } from 'react-router';
import SideBar from './sideBar/SideBar';
import { TRefetch } from '../../types/types';

// dashboard
function Dashboard() {
  const {
    refetchUserRelationships,
    isUsersPostsLoading,
    isLoggedUserDataLoading,
    refetchUsersPosts,
    refetchLoggedUserData,
  }: {
    refetchUserRelationships: TRefetch;
    isUsersPostsLoading: boolean;
    isLoggedUserDataLoading: boolean;
    refetchUsersPosts: TRefetch;
    refetchLoggedUserData: TRefetch;
  } = useOutletContext();
  return (
    <Grid2 container>
      <SideBar />
      <Grid2
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          // minHeight: '100vh',
        }}
      >
        <Box
          className={'hideScrollbar'}
          sx={{
            overflowY: 'scroll',
            flex: 1,
            backgroundColor: 'whitesmoke',
            padding: '10px',
          }}
        >
          <Outlet
            context={{
              refetchUserRelationships,
              isUsersPostsLoading,
              isLoggedUserDataLoading,
              refetchUsersPosts,
              refetchLoggedUserData,
            }}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default Dashboard;
