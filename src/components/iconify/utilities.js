import Iconify from './iconify';

/**
 * Get iconify icon component
 * to get icon name visit: https://icon-sets.iconify.design/solar/
 * @param {String} name   - name of the icon
 * @param {number} width   - width of the icon
 * @param {import('@mui/material').SxProps} sx   - style object
 * @returns {JSX.Element}
 */
export const getIconify = (name, width, sx) => <Iconify icon={name} width={width} sx={sx} />;
