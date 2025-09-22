import React, {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [couponsVisible, setCouponsVisible] = useState(false);

  const signup = () => {
    setIsSignedUp(true);
    setCouponsVisible(true);
  };

  const toggleCoupons = () => {
    setCouponsVisible(prev => !prev);
  };

  return (
    <AuthContext.Provider
      value={{isSignedUp, signup, couponsVisible, toggleCoupons}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
