import Iconify from './iconify';

/**
 * Get iconify icon component
 * to get icon name visit: https://icon-sets.iconify.design/solar/
 * @param {String} name   - name of the icon
 * @returns {JSX.Element}
 */
export const getIconify = (name) => <Iconify icon={name} />;
