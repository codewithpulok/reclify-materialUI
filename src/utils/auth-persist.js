import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from 'src/config-global';
// ----------------------------------------------------------------------
export const removeAuthState = () =>
  new Promise((resolve, reject) => {
    try {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(USER_STORAGE_KEY);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export const saveAuthState = (token = null, user = null) =>
  new Promise((resolve, reject) => {
    try {
      if (!token || !user) throw new Error('Invalid auth state value');

      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      resolve({ token, user });
    } catch (error) {
      reject(error);
    }
  });

export const getAuthState = () =>
  new Promise((resolve, reject) => {
    try {
      const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
      const userString = sessionStorage.getItem(USER_STORAGE_KEY);

      if (!token || !userString) throw new Error('Invalid auth state');

      const user = JSON.parse(userString);

      resolve({ user, token });
    } catch (error) {
      reject(error);
    }
  });

export const updateAuthState = (newToken = null, userUpdates = null) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      if (!newToken && !userUpdates) throw new Error('Invalid auth state update value');

      // remove undefined values
      const parsedUserUpdates = userUpdates
        ? Object.keys(userUpdates).reduce((prev, curr) => {
            if (userUpdates[curr]) prev[curr] = userUpdates[curr];
            return prev;
          }, {})
        : {};

      const { user } = await getAuthState();

      if (newToken) sessionStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      if (parsedUserUpdates)
        sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ ...user, ...parsedUserUpdates }));

      resolve({ token: newToken, user: { ...user, ...parsedUserUpdates } });
    } catch (error) {
      reject(error);
    }
  });
