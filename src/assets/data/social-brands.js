/** @type {SocialBrand[]} */
export const socialsBrands = [
  {
    key: 'facebook',
    name: 'Facebook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    iconSize: 20,
  },
  {
    key: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    iconSize: 20,
  },
  {
    key: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    iconSize: 20,
  },
  {
    key: 'x',
    name: 'X',
    icon: 'fa6-brands:square-x-twitter',
    color: '#000000',
    iconSize: 20,
  },
];

/**
 * find social brand
 * @param {string} key
 * @returns {SocialBrand}
 */
export const getSocialBrand = (key) => socialsBrands.find((b) => b.key === key);
