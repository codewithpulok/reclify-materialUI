import Iconify from './iconify';

/**
 * @callback IconifyFunc
 * @param {number | string} width   - width of the icon
 * @param {import('@mui/material').SxProps} sx   - style object
 * @returns {JSX.Element}
 */

/**
 * Get iconify icon component
 * to get icon name visit: https://icon-sets.iconify.design/solar/
 * @param {String} name   - name of the icon
 * @param {number | string} width   - width of the icon
 * @param {import('@mui/material').SxProps} sx   - style object
 * @returns {JSX.Element}
 */
export const getIconify = (name, width, sx) => <Iconify icon={name} width={width} sx={sx} />;

/**
 * Get iconify icon fucntion
 * to get icon name visit: https://icon-sets.iconify.design/solar/
 * @param {String} name   - name of the icon
 * @returns {IconifyFunc}
 */
export const getIconifyFunc = (name) => (width, sx) => getIconify(name, width, sx);
