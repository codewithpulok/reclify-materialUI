import { card } from 'creditcards';
import { getIconifyFunc } from 'src/components/common/iconify/utilities';

/**
 * All icons for the the user settings
 */
export const ICONS = {
  visa: getIconifyFunc('logos:visa'),
  mastercard: getIconifyFunc('logos:mastercard'),
  creditcard: getIconifyFunc('fontisto:credit-card'),

  plus: getIconifyFunc('mingcute:add-line'),
  more: getIconifyFunc('eva:more-vertical-fill'),
  delete: getIconifyFunc('solar:trash-bin-trash-bold'),
  edit: getIconifyFunc('solar:pen-bold'),
};

export const getCreditCardIcon = (number) => {
  const type = card.type(number);

  const parsedType = type?.toLowerCase().split(' ').join('_');

  const icon = ICONS?.[parsedType];

  return icon || ICONS.creditcard;
};
