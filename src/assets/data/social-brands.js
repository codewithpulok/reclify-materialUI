/** @type {SocialBrand[]} */
export const socialsBrands = [
  {
    key: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
  },
  {
    key: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
  },
  {
    key: 'x',
    name: 'X',
    icon: 'simple-icons:x',
    color: '#000000',
  },
];

/**
 * find social brand
 * @param {string} key
 * @returns {SocialBrand}
 */
export const getSocialBrand = (key) => socialsBrands.find((b) => b.key === key);
