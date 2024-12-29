import { Box, Grid2 } from '@mui/material';
import { Outlet } from 'react-router';
import './Dashboard.css';
import SideBar from './sideBar/SideBar';

// dashboard
function Dashboard() {
  return (
    <Grid2 container>
      <SideBar />
      <Grid2
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
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
          <Outlet />
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default Dashboard;
