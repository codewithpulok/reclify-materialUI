'use client';

import { createContext } from 'react';

// ----------------------------------------------------------------------
/** @type {AuthType} */
export const initialState = {
  user: null,
  method: 'jwt',
  loading: true,
  authenticated: false,
  unauthenticated: false,
  //
  login: () => {},
  register: () => {},
  logout: () => {},
};

/** @type {import('react').Context<AuthType>} */
export const AuthContext = createContext(initialState);
