import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import InventoryPage from './pages/Inventory';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import AuthContext from './context/Auth-context';
import MusicPage from './pages/Music';
import BookPage from './pages/BookPage';

import './App.css';

//this is my first commit of the new year, this is my new year resolution, to make a commit everyday for the rest of the year. This is the only time I will cheat and make such a pitiful commit

class App extends Component {
  state = {
    token: null,
    userId: null,
  };
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/music" element={<MusicPage />} />
              <Route path="/" element={<Navigate to="/inventory" />} />
              {/* <Route path="/books/:id" element={<BookPage />} />
               */}
              <Route path="/books/:bookId" element={<BookPage />} />

              {!this.state.token && (
                <Route path="/auth" element={<AuthPage />} />
              )}
              {/*
              {!this.state.token && (
                <Route path="/" element={<Navigate to="/auth" />} />
              )} */}

              {!this.state.token && (
                <Route path="/profile" element={<Navigate to="/auth" />} />
              )}

              {/* {this.state.token && (
                <Route path="/" element={<Navigate to="/inventory" />} />
              )} */}

              {this.state.token && (
                <Route path="/auth" element={<Navigate to="/inventory" />} />
              )}

              {this.state.token && (
                <Route path="/profile" element={<ProfilePage />} />
              )}
            </Routes>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;

// import React, { useMemo, useState, useEffect } from 'react';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from 'react-router-dom';

// import Navigation from './components/Navigation/Navigation';
// import InventoryPage from './pages/Inventory';
// import ProfilePage from './pages/ProfilePage';
// import AuthPage from './pages/AuthPage';
// import AuthContext from './context/Auth-context';

// import './App.css';

// const App = () => {
//   const [token, setToken] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   const login = (newToken, newUserId, tokenExpiration) => {
//     setToken(newToken);
//     setUserId(newUserId);
//   };

//   const logout = () => {
//     setToken(null);
//     setUserId(null);
//   };

//   const authContextValue = useMemo(
//     () => ({
//       token,
//       userId,
//       login,
//       logout,
//     }),
//     [token, userId]
//   );

//   useEffect(() => {
//     if (token) {
//       navigate('/inventory');
//     } else {
//       navigate('/auth');
//     }
//   }, [token, navigate]);

//   return (
//     <BrowserRouter>
//       <AuthContext.Provider value={authContextValue}>
//         <Navigation />
//         <main className="main-content">
//           <Routes>
//             <Route path="/inventory" element={<InventoryPage />} />
//             <Route
//               path="/profile"
//               element={token ? <ProfilePage /> : <Navigate to="/auth" />}
//             />
//             <Route
//               path="/auth"
//               element={!token ? <AuthPage /> : <Navigate to="/inventory" />}
//             />
//             <Route
//               path="/"
//               element={
//                 !token ? <Navigate to="/auth" /> : <Navigate to="/inventory" />
//               }
//             />
//           </Routes>
//         </main>
//       </AuthContext.Provider>
//     </BrowserRouter>
//   );
// };

// export default App;
