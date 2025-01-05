import { useMutation } from '@apollo/client';
import { Avatar, Button, Grid2, Stack, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { LoaderContext } from '../../context/LoaderContext';
import { getLoggedUserId } from '../../helper/getLoggedUserId';
import { handleImageSelection } from '../../helper/handleImageSelection';
import { clearToken } from '../../helper/storage';
import { ADD_PROFILE_PICTURE, LOGOUT } from '../../queries/queries';
import { RootState } from '../../store/store';
import Popup from '../popup/Popup';

// settings
function Settings() {
  const navigate = useNavigate();
  const userId = getLoggedUserId();
  const { setOpen } = useContext(LoaderContext);
  const { setAuthState } = useContext(AuthenticationContext);
  const { value } = useSelector((state: RootState) => state.loggedUserData);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [popupContent, setPopupContent] = useState({ open: false, title: '', description: '' });
  const [agreeUnfollow, setAgreeUnfollow] = useState(false);
  const [logout] = useMutation(LOGOUT, {
    onCompleted: ({ logout }) => {
      const { message } = logout;
      enqueueSnackbar(message, { variant: 'success' });
      setOpen(false);
      clearToken();
      setAuthState({ isLoggedIn: false, authType: 'login' });
      navigate('/');
    },
    onError: ({ message }) => {
      setOpen(false);
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const logoutHandler = () => {
    if (!userId) return enqueueSnackbar('No user loggedIn', { variant: 'error' });
    setOpen(true);
    logout({
      variables: { id: userId },
    });
  };

  useEffect(() => {
    if (image) {
      setPreviewImage(image as string);
    }
  }, [image]);

  const handleUserName = () => {
    setPopupContent({
      open: true,
      title: '',
      description: '',
    });
  };

  const [addProfilePicture] = useMutation(ADD_PROFILE_PICTURE, {
    onCompleted: ({ add_profile_picture }) => {
      const { message } = add_profile_picture;
      enqueueSnackbar(message, { variant: 'success' });
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const setProfilePictureHandler = async () => {
    if (previewImage) {
      await addProfilePicture({
        variables: {
          id: userId,
          image,
        },
      });
    }
    return;
  };

  return (
    <>
      {
        <Popup
          open={false}
          title=""
          description=""
          handleAgree={() => {}}
          handlerDisagree={() => {}}
        />
      }
      {value && (
        <Grid2
          container
          spacing={2}
          flexDirection={'column'}
          sx={{
            height: '100%',
            width: '100%',
            padding: '20px',
            color: 'var(--main-color)',
            backgroundColor: 'white',
            borderRadius: '10px',
          }}
        >
          <h2
            style={{
              fontWeight: 600,
            }}
          >
            Settings
          </h2>
          <Grid2
            container
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
            spacing={3}
          >
            <Stack alignItems={'center'} justifyContent={'center'} spacing={1}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={previewImage || previewImage || value.profilePicture || value.fullName}
                alt={value.fullName}
              />
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant={previewImage ? 'contained' : 'text'}
                onClick={setProfilePictureHandler}
                sx={{
                  mr: 'auto',
                  color: previewImage ? 'white' : 'var(--main-color)',
                  backgroundColor: previewImage ? 'var(--main-color)' : 'white',
                }}
              >
                <span>{previewImage ? 'Save profile picture' : 'Change profile picture'}</span>
                {!previewImage && (
                  <input
                    type="file"
                    accept="image/*"
                    aria-hidden="true"
                    hidden
                    onChange={(e) => handleImageSelection(e, setImage)}
                  />
                )}
              </Button>
            </Stack>

            <Stack alignItems={'center'} justifyContent={'center'}>
              <TextField value={value.fullName} label="Full name" disabled />
              <Button
                sx={{
                  color: 'var(--main-color)',
                }}
              >
                Change name
              </Button>
            </Stack>
            <Stack alignItems={'center'} justifyContent={'center'}>
              <TextField value={value.userName} label="User name" disabled />
              <Button
                sx={{
                  color: 'var(--main-color)',
                }}
              >
                Change user name
              </Button>
            </Stack>
          </Grid2>

          <Button
            sx={{
              color: 'red',
              alignSelf: 'flex-start',
              mt: 'auto',
            }}
          >
            Delete account
          </Button>
          <Button
            onClick={logoutHandler}
            sx={{
              color: 'white',
              backgroundColor: 'var(--main-color)',
              alignSelf: 'flex-start',
            }}
            variant="contained"
          >
            Logout
          </Button>
        </Grid2>
      )}
    </>
  );
}

export default Settings;
