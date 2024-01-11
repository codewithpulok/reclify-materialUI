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
