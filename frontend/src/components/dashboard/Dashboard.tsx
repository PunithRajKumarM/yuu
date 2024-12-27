import { Grid2 } from '@mui/material';
import { Outlet } from 'react-router';
import './Dashboard.css';
import SideBar from './sideBar/SideBar';
import Toast from '../toast/Toast';
import { useContext } from 'react';
import { ToastContext } from '../../context/ToastContext';

// dashboard
function Dashboard() {
  const { toast } = useContext(ToastContext);
  return (
    <>
      {toast && <Toast />}
      <Grid2
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100vw',
        }}
      >
        <SideBar />
        <Grid2
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Grid2
            className={'hideScrollbar'}
            sx={{
              height: 'auto',
              overflowY: 'scroll',
              flex: 1,
            }}
          >
            <Outlet />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}

export default Dashboard;
