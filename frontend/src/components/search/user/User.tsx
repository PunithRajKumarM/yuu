import { Avatar, Button, Grid2 } from '@mui/material';
import React from 'react';
import { TIDArray } from '../../../types/types';
import { IUserData } from '../../../interfaces/interfaces';

function User({
  user,
  followings,
  followUnfollowUserHandler,
}: {
  user: IUserData;

  followings: TIDArray;
  followUnfollowUserHandler: (selectedId: string, fullName: string) => void;
}) {
  const { id, fullName, userName, profilePicture } = user;
  return (
    <Grid2
      container
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      flexWrap={'wrap'}
      spacing={2}
      sx={{
        border: '1px solid',
        padding: '10px',
        borderRadius: '10px',
        width: '200px',
        height: '250px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Avatar
        src={profilePicture || fullName}
        alt={fullName}
        sx={{ width: '50px', height: '50px' }}
      />
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h3>{fullName}</h3>
        <small>{`@${userName}`}</small>
      </div>
      <Button onClick={() => followUnfollowUserHandler(id, fullName)}>
        <span>{followings.includes(id) ? 'Unfollow' : 'Follow'}</span>
      </Button>
    </Grid2>
  );
}

export default User;
