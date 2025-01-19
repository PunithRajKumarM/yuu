import { useQuery } from '@apollo/client';
import { enqueueSnackbar } from 'notistack';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { LoaderContext } from '../../context/LoaderContext';
import { getLoggedUserId } from '../../helper/getLoggedUserId';
import { IFollowers, IFollowings, IGetUsers } from '../../interfaces/interfaces';
import {
  GET_USER,
  GET_USER_RELATIONSHIPS,
  GET_USERS,
  GET_USERS_POSTS,
} from '../../queries/queries';
import { addAllUsersData } from '../../store/reducers/allUsersDataSlice';
import { addLoggedUserData } from '../../store/reducers/loggedUserDataSlice';
import { addUserRelationships } from '../../store/reducers/userRelationshipSlice';
import { addusersPostsData } from '../../store/reducers/usersPostsDataSlice';
import { TGetUser, TGetUsersPosts, TIDArray, TUsersPosts } from '../../types/types';
import CreatePost from '../dashboard/createPost/CreatePost';
import Loader from '../loader/Loader';
import LoginSignup from '../loginSignup/LoginSignup';
import { getImageUrl } from '../../helper/getImageUrl';

// home component
function Home() {
  const { isLoggedIn, setAuthState } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const userId = getLoggedUserId();
  const { open: openLoader } = useContext(LoaderContext);

  useEffect(() => {
    if (userId) {
      setAuthState({ authType: 'login', isLoggedIn: true });
    }
  }, [userId]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/dashboard');
  //   } else {
  //     navigate('/');
  //   }
  // }, [isAuthenticated]);

  const {
    data: loggedUserData,
    loading: isLoggedUserDataLoading,
    refetch: refetchLoggedUserData,
    error: loggedUserDataError,
  } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
    fetchPolicy: 'cache-first',
  });

  const {
    data: usersData,
    loading: isUsersDataLoading,
    error: isUsersDataError,
  } = useQuery(GET_USERS, {
    skip: !userId,
    fetchPolicy: 'cache-first',
  });

  const {
    data: usersPostsData,
    loading: isUsersPostsLoading,
    error: usersPostsError,
    refetch: refetchUsersPosts,
  } = useQuery(GET_USERS_POSTS, {
    skip: !userId,
    fetchPolicy: 'cache-first',
  });

  const {
    data: userRelationships,
    loading: isUserRelationshipsLoading,
    error: userRelationshipsError,
    refetch: refetchUserRelationships,
  } = useQuery(GET_USER_RELATIONSHIPS, {
    variables: { id: userId },
    skip: !userId,
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (loggedUserDataError) {
      const { message } = loggedUserDataError;
      enqueueSnackbar(message, { variant: 'error' });
    }
  }, [loggedUserDataError]);

  useEffect(() => {
    if (usersPostsError) {
      const { message } = usersPostsError;
      enqueueSnackbar(message, { variant: 'error' });
    }
  }, [usersPostsError]);

  useEffect(() => {
    if (isUsersDataError) {
      const { message } = isUsersDataError;
      enqueueSnackbar(message, { variant: 'error' });
    }
  }, [isUsersDataError]);

  useEffect(() => {
    if (userRelationshipsError) {
      const { message } = userRelationshipsError;
      enqueueSnackbar(message, { variant: 'error' });
    }
  }, [userRelationshipsError]);

  useEffect(() => {
    if (loggedUserData as TGetUser) {
      const { get_user } = loggedUserData;
      const { user } = get_user;
      const loggerUser = {
        email: user.email,
        userName: user.userName,
        fullName: user.fullName,
        profilePicture: getImageUrl(user.profilePicture),
      };
      dispatch(addLoggedUserData(loggerUser));
    }
  }, [loggedUserData]);

  useEffect(() => {
    if (usersData as IGetUsers) {
      const { get_users: users } = usersData as IGetUsers;
      const transformedUsers = users.map((user) => {
        const { id, email, userName, fullName, profilePicture } = user;
        return {
          id,
          email,
          userName,
          fullName,
          profilePicture: getImageUrl(profilePicture),
        };
      });
      dispatch(addAllUsersData(transformedUsers));
    }
  }, [usersData]);

  useEffect(() => {
    if (userRelationships) {
      const { get_user_relationships } = userRelationships;
      const {
        followers,
        followings,
      }: { followers: IFollowers[] | []; followings: IFollowings[] | [] } = get_user_relationships;
      const followersId: TIDArray = [];
      const followingsId: TIDArray = [];
      followers.map((f) => followersId.push(f.follower.id));
      followings.map((f) => followingsId.push(f.following.id));
      dispatch(
        addUserRelationships({
          followers: followersId,
          followings: followingsId,
        })
      );
    }
  }, [userRelationships]);

  useEffect(() => {
    if (usersPostsData as TGetUsersPosts) {
      const { get_users_posts } = usersPostsData;
      const { users } = get_users_posts;
      const userPosts = users.map((u: TUsersPosts) => {
        const { id, fullName, userName, posts, profilePicture } = u;
        return {
          id,
          fullName,
          userName,
          profilePicture: getImageUrl(profilePicture),
          posts: posts.map((p) => {
            const { id, link, text, createdAt, likes, comments } = p;
            return {
              id,
              link: getImageUrl(link),
              text,
              likes,
              comments,
              createdAt,
            };
          }),
        };
      });
      dispatch(addusersPostsData(userPosts));
    }
  }, [usersPostsData]);

  const isLoaderOpen =
    openLoader ||
    isLoggedUserDataLoading ||
    isUsersPostsLoading ||
    isUsersDataLoading ||
    isUserRelationshipsLoading;

  return (
    <>
      {<CreatePost refetchUsersPosts={refetchUsersPosts} />}
      {isLoaderOpen && <Loader open={isLoaderOpen} />}
      {!isLoggedIn && <LoginSignup />}
      {isLoggedIn && (
        <Outlet
          context={{
            refetchUserRelationships,
            isUsersPostsLoading,
            isLoggedUserDataLoading,
            refetchUsersPosts,
            refetchLoggedUserData,
          }}
        />
      )}
    </>
  );
}

export default Home;
