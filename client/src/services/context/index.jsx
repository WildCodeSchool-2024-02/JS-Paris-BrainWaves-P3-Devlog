import { createContext, useMemo, useState, useContext } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  const value = useMemo(() => (
    { auth, setAuth }
  ), [auth, setAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.isRequired
}

export default () => useContext(AuthContext);
export {AuthProvider};