import { Avatar, Box, Grid2 } from '@mui/material';
import { NavLink } from 'react-router';
import Logo from '../../../assets/yuu-logo.png';
import { linkData } from '../../../helper/linkData';
import { ISetCommonStyle } from '../../../interfaces/interfaces';
import React, { useContext } from 'react';
import { PostContext } from '../../../context/PostContext';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { TbMessageCircleFilled } from 'react-icons/tb';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getLoggedUserId } from '../../../helper/getLoggedUserId';
import { IoIosSettings } from 'react-icons/io';

// side bar
function SideBar() {
  const { setOpen } = useContext(PostContext);
  const { value } = useSelector((state: RootState) => state.allUsersData);
  const userId = getLoggedUserId();
  const setCommonStyle = (i: number, a: ISetCommonStyle[]) => {
    return {
      width: '100%',
      color: 'white',
      textDecoration: 'none',
      marginTop: i === a.length - 1 ? 'auto' : '20px',
      paddingBottom: i === a.length - 1 ? '20px' : 0,
      fontSize: 'large',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    };
  };

  const handleIcon = (link: string) => {
    const style = { width: '25px', height: '25px' };
    if (link === 'Home') return <HomeIcon sx={style} />;
    else if (link === 'Search') return <SearchIcon sx={style} />;
    else if (link === 'Chat') return <TbMessageCircleFilled style={{ fontSize: '25px' }} />;
    else if (link === 'Create') return <AddBoxIcon sx={style} />;
    else if (link === 'Profile') {
      if (value) {
        const user = value.find((u) => u.id === userId);
        return (
          <Avatar
            sx={{
              width: '25px',
              height: '25px',
            }}
            src={user?.profilePicture || user?.fullName}
          />
        );
      }
    }
    return <IoIosSettings style={{ fontSize: '25px' }} />;
  };

  return (
    <Grid2
      sx={{
        backgroundColor: 'var(--main-color)',
        width: '15%',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          flexWrap: 'wrap',
          height: '100%',
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            maxWidth: '220px',
            width: '120px',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flexWrap: 'wrap',
            flex: 1,
          }}
        >
          {linkData.map((d, i, a) => {
            const { label, link, post } = d;
            return (
              <React.Fragment key={i}>
                {post ? (
                  <Box onClick={() => setOpen(true)} style={setCommonStyle(i, a)}>
                    {handleIcon(label)}
                    {label}
                  </Box>
                ) : (
                  <NavLink key={i} style={setCommonStyle(i, a)} to={link} end>
                    {handleIcon(label)}
                    <span>{label}</span>
                  </NavLink>
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </Grid2>
  );
}

export default SideBar;
