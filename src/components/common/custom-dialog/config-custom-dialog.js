import { card } from 'creditcards';
import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for the the user settings
 */
export const ICONS = {
  visa: (width, sx) => getIconify('logos:visa', width, sx),
  mastercard: (width, sx) => getIconify('logos:mastercard', width, sx),
  creditcard: (width, sx) => getIconify('fontisto:credit-card', width, sx),

  plus: (width, sx) => getIconify('mingcute:add-line', width, sx),
  more: (width, sx) => getIconify('eva:more-vertical-fill', width, sx),
  delete: (width, sx) => getIconify('solar:trash-bin-trash-bold', width, sx),
  edit: (width, sx) => getIconify('solar:pen-bold', width, sx),
};

export const getCreditCardIcon = (number) => {
  const type = card.type(number);

  const parsedType = type.toLowerCase().split(' ').join('_');

  console.log({ parsedType });

  const icon = ICONS?.[parsedType];

  return icon || ICONS.creditcard;
};
