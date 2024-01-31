import PropTypes from 'prop-types';
import { getIconify } from 'src/components/common/iconify/utilities';

/** common props for form */
export const CustomFormProps = {
  /** wrapper element for fields */
  wrapperElement: PropTypes.elementType,
  /** action button for form */
  actions: PropTypes.node,
  /** @type {(data: any, error: false, reset: (values) => {}) => {}} */
  /** @type {(data: any, reset: (values) => {}) => {}} */
  submitCallback: PropTypes.func,
  cancelCallback: PropTypes.func,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

export const ICONS = {
  visacard: (width, sx) => getIconify('logos:visa', width, sx),
  mastercard: (width, sx) => getIconify('logos:mastercard', width, sx),

  close: (width, sx) => getIconify('solar:close-circle-bold', width, sx),
  dropdown: (width, sx) => getIconify('solar:alt-arrow-down-outline', width, sx),
};
