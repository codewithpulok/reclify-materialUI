/** @typedef {WarehouseAddress[]} */
export const addresses = [
  {
    streetNumber: '123',
    streetAddress: 'Main St',
    city: 'City Center',
    state: 'State A',
    zipCode: '12345',
    country: 'Country X',
  },
  {
    streetNumber: '456',
    streetAddress: 'Elm St',
    city: 'Downtown',
    state: 'State B',
    zipCode: '67890',
    country: 'Country Y',
  },
  {
    streetNumber: '789',
    streetAddress: 'Maple St',
    city: 'Uptown',
    state: 'State C',
    zipCode: '54321',
    country: 'Country Z',
  },
  {
    streetNumber: '101',
    streetAddress: 'Pine St',
    city: 'Cityscape',
    state: 'State D',
    zipCode: '98765',
    country: 'Country X',
  },
  {
    streetNumber: '202',
    streetAddress: 'Cedar St',
    city: 'Metropolis',
    state: 'State E',
    zipCode: '13579',
    country: 'Country Y',
  },
  {
    streetNumber: '303',
    streetAddress: 'Birch St',
    city: 'Downtown Core',
    state: 'State F',
    zipCode: '24680',
    country: 'Country Z',
  },
  {
    streetNumber: '404',
    streetAddress: 'Sycamore St',
    city: 'Central City',
    state: 'State G',
    zipCode: '11223',
    country: 'Country X',
  },
  {
    streetNumber: '505',
    streetAddress: 'Willow St',
    city: 'Urban Center',
    state: 'State H',
    zipCode: '998877',
    country: 'Country Y',
  },
  {
    streetNumber: '606',
    streetAddress: 'Cherry St',
    city: 'Downtown Plaza',
    state: 'State I',
    zipCode: '665544',
    country: 'Country Z',
  },
  {
    streetNumber: '707',
    streetAddress: 'Magnolia St',
    city: 'City Square',
    state: 'State J',
    zipCode: '112233',
    country: 'Country X',
  },
];

const countries = [{ code: 'US', country: 'United States' }];

const states = [
  { country: 'United States', state: 'California' },
  { country: 'United States', state: 'Texas' },
  { country: 'United States', state: 'New York' },
  { country: 'United States', state: 'Florida' },
  { country: 'United States', state: 'Illinois' },
  { country: 'United States', state: 'Pennsylvania' },
  { country: 'United States', state: 'Ohio' },
  { country: 'United States', state: 'Georgia' },
  { country: 'United States', state: 'North Carolina' },
  { country: 'United States', state: 'Michigan' },
];

const cities = [
  { country: 'United States', state: 'California', city: 'Los Angeles' },
  { country: 'United States', state: 'California', city: 'San Francisco' },
  { country: 'United States', state: 'California', city: 'San Diego' },
  { country: 'United States', state: 'California', city: 'San Jose' },
  { country: 'United States', state: 'California', city: 'Sacramento' },
  { country: 'United States', state: 'California', city: 'Fresno' },
  { country: 'United States', state: 'California', city: 'Oakland' },
  { country: 'United States', state: 'California', city: 'Long Beach' },
  { country: 'United States', state: 'California', city: 'Bakersfield' },
  { country: 'United States', state: 'California', city: 'Anaheim' },
];

const streets = [
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Hollywood Boulevard',
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Sunset Boulevard',
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Wilshire Boulevard',
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Santa Monica Boulevard',
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Figueroa Street',
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Melrose Avenue',
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'La Cienega Boulevard',
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Mulholland Drive',
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Venice Boulevard',
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Rodeo Drive',
  },
];

const streetNumbers = [
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Hollywood Boulevard',
    streetNumber: 6201,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Sunset Boulevard',
    streetNumber: 7000,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Wilshire Boulevard',
    streetNumber: 800,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Santa Monica Boulevard',
    streetNumber: 1500,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Figueroa Street',
    streetNumber: 200,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Melrose Avenue',
    streetNumber: 300,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'La Cienega Boulevard',
    streetNumber: 450,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Mulholland Drive',
    streetNumber: 1200,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Venice Boulevard',
    streetNumber: 2500,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    streetAddress: 'Rodeo Drive',
    streetNumber: 400,
  },
];

const zipCodes = [
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipCode: 90028,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',

    zipCode: 90046,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',

    zipCode: 90017,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',

    zipCode: 90025,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',

    zipCode: 90015,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',

    zipCode: 90036,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',

    zipCode: 90035,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',

    zipCode: 90046,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',

    zipCode: 90034,
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',

    zipCode: 90210,
  },
];

export const getCountries = () => [...countries].map((c) => c.country);
export const getStates = (country) =>
  states.filter((state) => state.country === country).map((s) => s.state);
export const getCities = (country, state) =>
  cities.filter((city) => city.country === country && city.state === state).map((c) => c.city);
export const getZipCodes = (country, state, city) =>
  zipCodes
    .filter(
      (zipCode) => zipCode.country === country && zipCode.state === state && zipCode.city === city
    )
    .map((z) => z.zipCode);
export const getStreets = (country, state, city) =>
  streets
    .filter(
      (street) => street.country === country && street.state === state && street.city === city
    )
    .map((s) => s.streetAddress);
export const getStreetNumbers = (country, state, city, street) =>
  streetNumbers
    .filter(
      (streetNumber) =>
        streetNumber.country === country &&
        streetNumber.state === state &&
        streetNumber.city === city &&
        streetNumber.streetAddress === street
    )
    .map((s) => s.streetNumber);
