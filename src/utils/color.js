/**
 * Clamps a value between a minimum and maximum range.
 * @param {number} value - The value to clamp.
 * @param {number} [min=0] - The minimum value of the range.
 * @param {number} [max=1] - The maximum value of the range.
 * @returns {number} The clamped value.
 */
function clamp(value, min = 0, max = 1) {
  if (value < min || value > max) {
    console.error(`The value provided ${value} is out of range [${min}, ${max}].`);
  }
  return Math.min(Math.max(min, value), max);
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */
function hexToRgb(color) {
  color = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  let colors = color.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors
    ? `rgb${colors.length === 4 ? 'a' : ''}(${colors
        .map((n, index) =>
          index < 3 ? parseInt(n, 16) : Math.round((parseInt(n, 16) / 255) * 1000) / 1000
        )
        .join(', ')})`
    : '';
}

/**
 * Converts an integer to its hexadecimal representation.
 * @param {number} int - The integer to convert.
 * @returns {string} The hexadecimal representation of the integer.
 */
export function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * Decomposes a color string into its components.
 * @param {string} color - The color string to decompose.
 * @returns {{
 *  type: string,
 *  values: (number|string)[],
 *  colorSpace: string|undefined
 * }} Object containing the type, values, and color space of the decomposed color.
 */
function decomposeColor(color) {
  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }
  const marker = color.indexOf('(');
  const type = color.substring(0, marker);
  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error(
      `Unsupported \`${color}\` color. The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`
    );
  }
  const value = color.substring(marker + 1, color.length - 1);
  let values;
  let colorSpace;
  if (type === 'color') {
    values = value.split(' ');
    colorSpace = values.shift();
    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].slice(1);
    }
    if (
      colorSpace &&
      ['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1
    ) {
      throw new Error(
        `unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
      );
    }
  } else {
    values = value.split(',');
  }

  return {
    type,
    values: values.map((v) => parseFloat(v)),
    colorSpace,
  };
}

/**
 * Recomposes a decomposed color object into a color string.
 * @param {{
 *  type: string,
 *  values: (number|string)[],
 *  colorSpace: string|undefined
 * }} color - The decomposed color object.
 * @returns {string} The recomposed color string.
 */
function recomposeColor(color) {
  const { type, colorSpace } = color;
  let { values } = color;

  let returnV;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => (i < 3 ? parseInt(n, 10) : n));
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }
  if (type.indexOf('color') !== -1) {
    returnV = `${colorSpace} ${values.join(' ')}`;
  } else {
    returnV = `${values.join(', ')}`;
  }
  return `${type}(${returnV})`;
}

/**
 * Adds an alpha value to a color string.
 * @param {string} color - The color string.
 * @param {number} value - The alpha value to add.
 * @returns {string} The color string with added alpha value.
 */
export function alpha(color, value) {
  const dcolor = decomposeColor(color);
  const cvalue = clamp(value);
  if (dcolor.type === 'rgb' || dcolor.type === 'hsl') {
    dcolor.type += 'a';
  }
  if (dcolor.type === 'color') {
    dcolor.values[3] = `/${cvalue}`;
  } else {
    dcolor.values[3] = cvalue;
  }
  return recomposeColor(dcolor);
}
