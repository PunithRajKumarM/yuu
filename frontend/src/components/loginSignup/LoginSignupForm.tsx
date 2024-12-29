import { useMutation } from '@apollo/client';
import { Box, Button, Grid2, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { ErrorsList } from '../../helper/ErrorsLists';
import { focusAndUpdateError, focusAndUpdateState } from '../../helper/focusAndUpdate';
import { isValidEmail } from '../../helper/isValidEmail';
import { setEncodedAccessTokenToLocal, setEncodedRefreshTokenToLocal } from '../../helper/storage';
import { updateState } from '../../helper/updateState';
import { validatePassword } from '../../helper/validatePassword';
import { RESET_PASSWORD, SAVE_USER } from '../../queries/queries';
import EmailField from './emailField/EmailField';
import NameField from './nameField/NameField';
import PasswordField from './passwordField/PasswordField';

// login signup form
function LoginSignupForm() {
  const [emailState, setEmailState] = useState({
    value: '',
    error: false,
    helperText: '',
  });
  const [passwordState, setPasswordState] = useState({
    value: '',
    error: false,
    helperText: '',
  });
  const [confirmPasswordState, setConfirmPasswordState] = useState({
    value: '',
    error: false,
    helperText: '',
  });
  const [fullNameState, setFullNameState] = useState({
    value: '',
    error: false,
    helperText: '',
  });
  const [userNameState, setUserNameState] = useState({
    value: '',
    error: false,
    helperText: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [forgotPassword, setForgotPassword] = useState(false);
  const { authType, setAuthState } = useContext(AuthenticationContext);

  const authTypeName = authType === 'login' ? 'Login' : 'Signup';
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const navigate = useNavigate();

  const email = emailState.value;
  const password = passwordState.value;
  const confirmPassword = confirmPasswordState.value;
  const fullName = fullNameState.value;
  const userName = userNameState.value;
  const emailErrorText = emailState.helperText;
  const passwordErrorText = passwordState.helperText;
  const confirmPasswordErrorText = confirmPasswordState.helperText;
  const clearState = { value: '', error: false, helperText: '' };
  const isEmailValid = isValidEmail(emailState.value);
  const isPasswordValid = validatePassword(password);

  const [saveUser] = useMutation(SAVE_USER, {
    onCompleted: ({ save_user }) => {
      const { message, accessToken, refreshToken } = save_user;
      setEncodedAccessTokenToLocal(accessToken);
      setEncodedRefreshTokenToLocal(refreshToken);
      enqueueSnackbar(message, { variant: 'success' });
      resetStates();
      setAuthState({ authType: 'login', isLoggedIn: true });
      navigate('/dashboard');
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, { variant: 'error' });
    },
  });
  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: ({ reset_password }) => {
      const { message } = reset_password;
      enqueueSnackbar(message, { variant: 'success' });
      navigate('/');
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, { variant: 'success' });
    },
  });

  const resetStates = () => {
    setEmailState(clearState);
    setPasswordState(clearState);
    setConfirmPasswordState(clearState);
    setFullNameState(clearState);
    setUserNameState(clearState);
    focusAndUpdateError(setError, false, '');
    setShowPassword({
      password: false,
      confirmPassword: false,
    });
  };

  // reset state value
  useEffect(() => {
    resetStates();
  }, [authType, forgotPassword]);

  useEffect(() => {
    if (email && emailErrorText === ErrorsList.EMAIL_REQUIRED) {
      focusAndUpdateState(setEmailState, false, '');
    }
    if (
      (password && passwordErrorText === ErrorsList.PASSWORD_REQUIRED) ||
      (password && isPasswordValid && passwordErrorText === ErrorsList.PASSWORD_CONDITION)
    ) {
      focusAndUpdateState(setPasswordState, false, '');
    }

    if (
      (confirmPassword && confirmPasswordErrorText === ErrorsList.CONFIRM_PASSWORD_REQUIRED) ||
      (confirmPassword &&
        password === confirmPassword &&
        confirmPasswordErrorText === ErrorsList.UNMATCHED_CONFIRM_PASSWORD)
    ) {
      focusAndUpdateState(setConfirmPasswordState, false, '');
    }
  }, [emailState, passwordState, confirmPassword]);

  useEffect(() => {
    if (
      forgotPassword &&
      (passwordRef.current?.focus || confirmPasswordRef.current?.focus) &&
      error.status
    ) {
      focusAndUpdateError(setError, false, '');
    }
  }, [forgotPassword, password, confirmPassword]);

  const passwordHandler = (password: string) => {
    updateState(password, setPasswordState);
  };

  const confirmPasswordHandler = (password: string) => {
    updateState(password, setConfirmPasswordState);
  };

  const fullNameHandler = (name: string) => {
    updateState(name, setFullNameState);
  };

  const userNameHandler = (name: string) => {
    updateState(name, setUserNameState);
  };

  const showPasswordHandler = (state: boolean) => {
    setShowPassword((pre) => ({
      ...pre,
      password: state,
    }));
  };

  const showConfirmPasswordHandler = (state: boolean) => {
    setShowPassword((pre) => ({
      ...pre,
      confirmPassword: state,
    }));
  };

  const emailOnBlurHandler = () => {
    if (authType === 'signup' || forgotPassword) {
      if (email && !isEmailValid) {
        focusAndUpdateState(setEmailState, true, ErrorsList.ENTER_VALID_EMAIL, emailRef);
        return;
      }
      focusAndUpdateState(setEmailState, false, '');
      return;
    }
    return;
  };

  const passwordOnBlurHandler = () => {
    if (authType === 'signup' || forgotPassword) {
      if (password && !isPasswordValid) {
        focusAndUpdateState(setPasswordState, true, ErrorsList.PASSWORD_CONDITION, passwordRef);
        return;
      }
      if (password && isPasswordValid) {
        focusAndUpdateState(setPasswordState, false, '');
        return;
      }
    }
    return;
  };

  const confirmPasswordOnBlurHandler = () => {
    if (confirmPassword && password === confirmPassword) {
      focusAndUpdateState(setConfirmPasswordState, false, '');
      return;
    }
    if (confirmPassword && password !== confirmPassword) {
      focusAndUpdateState(
        setConfirmPasswordState,
        true,
        ErrorsList.UNMATCHED_CONFIRM_PASSWORD,
        confirmPasswordRef
      );
      return;
    }
  };

  const LoginSignupSubmitHandler = () => {
    if (authType === 'login') {
      if (!email) {
        focusAndUpdateError(setError, true, ErrorsList.EMPTY_CREDENTIALS, emailRef);
        return;
      }
      if (!password) {
        focusAndUpdateError(setError, true, ErrorsList.EMPTY_CREDENTIALS, passwordRef);
        return;
      }

      return;
    }
    if (authType === 'signup') {
      if (!email) {
        focusAndUpdateState(setEmailState, true, ErrorsList.EMAIL_REQUIRED, emailRef);
        return;
      }
      if (!fullName) {
        focusAndUpdateState(setFullNameState, true, ErrorsList.FULL_NAME_REQUIRED, fullNameRef);
        return;
      }
      if (!userName) {
        focusAndUpdateState(setUserNameState, true, ErrorsList.USER_NAME_REQUIRED, userNameRef);
        return;
      }
      if (!password) {
        focusAndUpdateState(setPasswordState, true, ErrorsList.PASSWORD_REQUIRED, passwordRef);
        return;
      }
      if (!confirmPassword) {
        focusAndUpdateState(
          setConfirmPasswordState,
          true,
          ErrorsList.CONFIRM_PASSWORD_REQUIRED,
          confirmPasswordRef
        );
        return;
      }
      if (password && confirmPassword && password !== confirmPassword) {
        focusAndUpdateState(
          setConfirmPasswordState,
          true,
          ErrorsList.UNMATCHED_CONFIRM_PASSWORD,
          confirmPasswordRef
        );
        return;
      }
      saveUser({
        variables: { email, password, userName, fullName },
      });
      return;
    }
  };

  const forgotPasswordHandler = () => {
    if (!email) {
      focusAndUpdateState(setEmailState, true, ErrorsList.EMAIL_REQUIRED, emailRef);
      return;
    }
    if (!password) {
      focusAndUpdateState(setPasswordState, true, ErrorsList.PASSWORD_REQUIRED, passwordRef);
      return;
    }
    if (password && !isPasswordValid) {
      focusAndUpdateState(setPasswordState, true, ErrorsList.PASSWORD_CONDITION, passwordRef);
      return;
    }
    if (!confirmPassword) {
      focusAndUpdateState(
        setConfirmPasswordState,
        true,
        ErrorsList.CONFIRM_PASSWORD_REQUIRED,
        confirmPasswordRef
      );
      return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      focusAndUpdateState(
        setConfirmPasswordState,
        true,
        ErrorsList.UNMATCHED_CONFIRM_PASSWORD,
        confirmPasswordRef
      );
      return;
    }

    resetPassword({
      variables: {
        email,
        password,
      },
    })
      .then((data) => {
        const { reset_password } = data?.data;
        const { message } = reset_password;
        enqueueSnackbar(message, { variant: 'success' });
        resetStates();
        setForgotPassword(false);
      })
      .catch((err) => {
        const { message } = err;
        return focusAndUpdateError(setError, true, message);
      });
  };

  return (
    <Grid2
      size={{ xs: 12, lg: 6 }}
      sx={{
        background: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        order: { xs: 2, lg: 0 },
        height: { xs: '70%', lg: '100%' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          width: { xs: '70%', lg: '45%' },
        }}
      >
        <h1 style={{ color: 'var(--main-color)' }}>
          {' '}
          {forgotPassword ? 'Reset password' : authTypeName}
        </h1>
        <EmailField
          email={emailState.value}
          inputRef={emailRef}
          setEmail={setEmailState}
          error={emailState.error}
          helperText={emailState.helperText}
          emailOnBlurHandler={emailOnBlurHandler}
        />
        {authType === 'signup' && (
          <NameField
            value={fullNameState.value}
            error={fullNameState.error}
            setName={fullNameHandler}
            inputRef={fullNameRef}
            helperText={fullNameState.helperText}
            label="Full name"
            placeholder="Enter your full name"
          />
        )}
        {authType === 'signup' && (
          <NameField
            value={userNameState.value}
            error={userNameState.error}
            setName={userNameHandler}
            inputRef={userNameRef}
            helperText={userNameState.helperText}
            label="User name"
            placeholder="Create user name"
          />
        )}
        <PasswordField
          value={passwordState.value}
          passwordHandler={passwordHandler}
          showPassword={showPassword.password}
          setShowPassword={showPasswordHandler}
          label={forgotPassword ? 'New password' : 'Password'}
          inputRef={passwordRef}
          error={passwordState.error}
          helperText={passwordState.helperText}
          passwordOnBlurHandler={passwordOnBlurHandler}
        />
        {(authType === 'signup' || forgotPassword) && (
          <PasswordField
            value={confirmPasswordState.value}
            passwordHandler={confirmPasswordHandler}
            showPassword={showPassword.confirmPassword}
            setShowPassword={showConfirmPasswordHandler}
            label={'Confirm password'}
            inputRef={confirmPasswordRef}
            error={confirmPasswordState.error}
            helperText={confirmPasswordState.helperText}
            passwordOnBlurHandler={confirmPasswordOnBlurHandler}
          />
        )}
        {error.status && (
          <Box
            sx={{
              color: '#ff0000',
              margin: '3px 14px 0px',
            }}
          >
            {error.message}
          </Box>
        )}
        {!forgotPassword && authType === 'login' && (
          <Typography
            sx={{
              cursor: 'pointer',
              color: 'var(--main-color)',
              ':hover': { color: '#576cbd' },
            }}
            onClick={() => setForgotPassword(true)}
          >
            Forgot your password?
          </Typography>
        )}
        <Button
          onClick={forgotPassword ? forgotPasswordHandler : LoginSignupSubmitHandler}
          variant="contained"
          sx={{ width: '100%', backgroundColor: 'var(--main-color)' }}
        >
          {forgotPassword ? 'Reset Password' : authTypeName}
        </Button>
        {!forgotPassword &&
          (authType === 'login' ? (
            <Typography>
              Don&apos;t have an account?{' '}
              <Box
                component="span"
                sx={{
                  color: 'var(--main-color)',
                  cursor: 'pointer',
                  ':hover': { color: '#576cbd' },
                }}
                onClick={() => setAuthState({ authType: 'signup' })}
              >
                Signup
              </Box>
            </Typography>
          ) : (
            <Typography>
              Already an user?{' '}
              <Box
                component="span"
                sx={{
                  color: 'var(--main-color)',
                  cursor: 'pointer',
                  ':hover': { color: '#576cbd' },
                }}
                onClick={() => setAuthState({ authType: 'login' })}
              >
                Login
              </Box>
            </Typography>
          ))}
        {forgotPassword && (
          <Typography
            sx={{
              cursor: 'pointer',
              color: 'var(--main-color)',
              ':hover': { color: '#576cbd' },
            }}
            onClick={() => setForgotPassword(false)}
          >
            Back
          </Typography>
        )}
      </Box>
    </Grid2>
  );
}

export default LoginSignupForm;
