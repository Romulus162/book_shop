import React from 'react';

export default React.createContext({
  token: null,
  staffId: null,
  login: (token, staffId, tokenExpiration) => {},
  logout: () => {},
});
