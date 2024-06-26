import { paths } from 'src/routes/paths';

// LOCALSTORAGE KEY // ----------------------------------------------------------------------
export const USER_STORAGE_KEY = 'RACKLIFY_USER';
export const TOKEN_STORAGE_KEY = 'RACKLIFY_TOKEN';
export const APPEARANCE_KEY = 'RACKLIFY_APPEARANCE';

// PLACEHOLDER IMAGE // ---------------------------------------------------------------------
export const PLACEHOLDER_PROFILE_BANNER = '/assets/placeholder/PROFILE_COVER.jpg';
export const PLACEHOLDER_PROFILE_AVATAR = '/assets/placeholder/PROFILE_AVATAR.png';
export const PLACEHOLDER_NEWS_COVER = '/assets/placeholder/NEWS_COVER.jpg';
export const PLACEHOLDER_WAREHOUSE_IMAGE = '/assets/placeholder/WAREHOUSE.jpg';

// API // ----------------------------------------------------------------------
export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_API; // mapbox api key

export const { PRIVATE_BACKEND_API } = process.env; // api link for server side
export const PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API; // api link for client side

// ROOT PATH AFTER AUTH SUCCESSFUL // ----------------------------------------------------------------------
export const PATH_AFTER_LOGIN = paths.dashboard.warehouses.root;
export const PATH_AFTER_REGISTER = paths.settings.general;

// STRIPE KEYS // ----------------------------------------------------------------------
export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY;
