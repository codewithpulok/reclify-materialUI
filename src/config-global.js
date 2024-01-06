import { paths } from 'src/routes/paths';

// API // ----------------------------------------------------------------------
export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_API; // mapbox api key

export const { PRIVATE_BACKEND_API } = process.env; // api link for server side
export const PUBLIC_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API; // api link for client side

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.warehouses.root;
