import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Chats from './components/dashboard/chats/Chats';
import Dashboard from './components/dashboard/Dashboard';
import Feed from './components/dashboard/feed/Feed';
import Profile from './components/dashboard/profile/Profile';
import Home from './components/home/Home';
import AuthenticationContextProvider from './context/AuthenticationContext';
import PostContextProvider from './context/PostContext';
import LoaderContextProvider from './context/LoaderContext';
import Search from './components/search/Search';
import Settings from './components/settings/Settings';

// app
function App() {
  return (
    <>
      <SnackbarProvider maxSnack={2}>
        <AuthenticationContextProvider>
          <LoaderContextProvider>
            <PostContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />}>
                    <Route path="dashboard" element={<Dashboard />}>
                      <Route index element={<Feed />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="chats" element={<Chats />} />
                      <Route path="search" element={<Search />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                  </Route>
                </Routes>
              </BrowserRouter>
            </PostContextProvider>
          </LoaderContextProvider>
        </AuthenticationContextProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
