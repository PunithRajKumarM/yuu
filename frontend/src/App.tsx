import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Chats from './components/dashboard/chats/Chats';
import Dashboard from './components/dashboard/Dashboard';
import Feed from './components/dashboard/feed/Feed';
import Profile from './components/dashboard/profile/Profile';
import Home from './components/home/Home';
import AuthenticationContextProvider from './context/AuthenticationContext';
import ToastContextProvider from './context/ToastContext';

// app
function App() {
  return (
    <>
      <AuthenticationContextProvider>
        <ToastContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="dashboard" element={<Dashboard />}>
                  <Route index element={<Feed />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="chats" element={<Chats />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastContextProvider>
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
