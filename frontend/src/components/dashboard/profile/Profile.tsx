import { Box, Grid2 } from '@mui/material';
import ProfileHeader from './profileHeader/ProfileHeader';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import Posts from '../posts/Posts';

// profile
function Profile() {
  const [value, setValue] = useState(0);
  const profileTabList = ['My Post', 'Saved post'];
  return (
    <Grid2 container flexDirection={'column'} spacing={2} height={'100%'}>
      <ProfileHeader />
      <Grid2 sx={{ flex: 1, backgroundColor: 'white', borderRadius: '10px' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(_: React.SyntheticEvent, n: number) => setValue(n)}>
              {profileTabList.map((p, i) => (
                <Tab key={i} label={p} value={i} />
              ))}
            </TabList>
          </Box>
          {profileTabList.map((_, i) => (
            <TabPanel value={i}>{i ? <>Saved</> : <Posts />}</TabPanel>
          ))}
        </TabContext>
      </Grid2>
    </Grid2>
  );
}

export default Profile;
