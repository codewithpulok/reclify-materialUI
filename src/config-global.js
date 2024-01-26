import { paths } from 'src/routes/paths';

// LOCALSTORAGE KEY // ----------------------------------------------------------------------
export const USER_STORAGE_KEY = 'RACKLIFY_USER';
export const TOKEN_STORAGE_KEY = 'RACKLIFY_TOKEN';

// PLACEHOLDER IMAGE // ---------------------------------------------------------------------
export const PLACEHOLDER_PROFILE_BANNER =
  'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg';
export const PLACEHOLDER_WAREHOUSE_IMAGE = 'https://placehold.co/450x318?text=Not+Found';

// API // ----------------------------------------------------------------------
export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_API; // mapbox api key

export const { PRIVATE_BACKEND_API } = process.env; // api link for server side
export const PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API; // api link for client side

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.warehouses.root;
