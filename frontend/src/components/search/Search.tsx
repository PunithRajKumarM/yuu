import { useMutation } from '@apollo/client';
import { Avatar, Box, Button, Grid2, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoaderContext } from '../../context/LoaderContext';
import { getLoggedUserId } from '../../helper/getLoggedUserId';
import { IUserData } from '../../interfaces/interfaces';
import { FOLLOW_UNFOLLOW_USER } from '../../queries/queries';
import { RootState } from '../../store/store';
import Popup from '../popup/Popup';
import { useOutletContext } from 'react-router';
import { TRefetch } from '../../types/types';
import User from './user/User';

function Search() {
  const [openPopupData, setOpenPopupData] = useState<{ open: boolean; userId: string | null }>({
    open: false,
    userId: null,
  });
  const [agreeUnfollow, setAgreeUnfollow] = useState(false);
  const allUsersData = useSelector((state: RootState) => state.allUsersData);
  const { followings } = useSelector((state: RootState) => state.userRelationships);
  const { setOpen: loaderSetOpen } = useContext(LoaderContext);
  const { refetchUserRelationships }: { refetchUserRelationships: TRefetch } = useOutletContext();

  const userId = getLoggedUserId();
  const { value } = allUsersData;

  const [followUnfollowUser] = useMutation(FOLLOW_UNFOLLOW_USER, {
    onCompleted: ({ follow_unfollow_user }) => {
      const { message } = follow_unfollow_user;
      refetchUserRelationships();
      loaderSetOpen(false);
      setOpenPopupData({ open: false, userId: null });
      enqueueSnackbar(message, { variant: 'success' });
    },
    onError: ({ message }) => {
      loaderSetOpen(false);
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const followUnfollowUserHandler = (selectedId: string, fullName: string) => {
    const followingUser = followings.includes(selectedId);
    if (!followingUser) {
      loaderSetOpen(true);
      followUnfollowUser({
        variables: {
          id: userId,
          followingId: selectedId,
        },
      });
      return;
    }
    setOpenPopupData({ open: true, userId: selectedId });
  };

  useEffect(() => {
    if (agreeUnfollow) {
      loaderSetOpen(true);
      followUnfollowUser({
        variables: {
          id: userId,
          followingId: openPopupData.userId,
        },
      });
    }
  }, [agreeUnfollow]);

  const handleAgree = () => {
    setAgreeUnfollow(true);
    setOpenPopupData((pre) => ({
      ...pre,
      open: false,
    }));
  };
  const handlerDisagree = () => {
    setAgreeUnfollow(false);
    setOpenPopupData({ open: false, userId: null });
  };

  return (
    <>
      {openPopupData.open && (
        <Popup
          title={`Unfollow ${
            value?.find((user) => user.id === openPopupData.userId)?.fullName || ''
          }?`}
          description={`Are you sure you want to unfollow ${
            value?.find((user) => user.id === openPopupData.userId)?.fullName || ''
          }? This action cannot be undone.`}
          open={openPopupData.open}
          handleAgree={handleAgree}
          handlerDisagree={handlerDisagree}
          agreeText="Unfollow"
        />
      )}
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
          spacing={3}
          flexWrap={'wrap'}
          sx={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            height: '100%',
          }}
        >
          <TextField
            sx={{
              width: '80%',
              placeSelf: 'center',
            }}
            placeholder="Search"
          />
          <Grid2 container spacing={2} justifyContent={'center'} alignItems={'center'}>
            {value && value.length ? (
              value
                .filter((user: IUserData) => user.id !== userId)
                .map((user: IUserData) => {
                  const { id } = user;
                  return (
                    <User
                      key={id}
                      user={user}
                      followings={followings}
                      followUnfollowUserHandler={followUnfollowUserHandler}
                    />
                  );
                })
            ) : (
              <span style={{ textAlign: 'center' }}>No user found</span>
            )}
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}

export default Search;
