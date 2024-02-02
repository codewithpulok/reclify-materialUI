const countries = [{ code: 'US', label: 'United States' }];

const states = [
  { label: 'Pennsylvania', code: 'PA', countryCode: 'US' },
  { label: 'New Jersey', code: 'NJ', countryCode: 'US' },
  { label: 'Connecticut', code: 'CT', countryCode: 'US' },
  { label: 'Rhode Island', code: 'RI', countryCode: 'US' },
  { label: 'Massachusetts', code: 'MA', countryCode: 'US' },
  { label: 'New York', code: 'NY', countryCode: 'US' },
  { label: 'Vermont', code: 'VT', countryCode: 'US' },
  { label: 'Maine', code: 'ME', countryCode: 'US' },
  { label: 'New Hampshire', code: 'NH', countryCode: 'US' },
  //
  { label: 'North Dakota', code: 'ND', countryCode: 'US' },
  { label: 'South Dakota', code: 'DS', countryCode: 'US' },
  { label: 'Nebraska', code: 'NE', countryCode: 'US' },
  { label: 'Kansas', code: 'KS', countryCode: 'US' },
  { label: 'Minnesota', code: 'MN', countryCode: 'US' },
  { label: 'Iowa', code: 'IA', countryCode: 'US' },
  { label: 'Missouri', code: 'MO', countryCode: 'US' },
  { label: 'Wisconsin', code: 'WI', countryCode: 'US' },
  { label: 'Michigan', code: 'MI', countryCode: 'US' },
  { label: 'Illinois', code: 'IL', countryCode: 'US' },
  { label: 'Indiana', code: 'IN', countryCode: 'US' },
  { label: 'Ohio', code: 'OH', countryCode: 'US' },
  //
  { label: 'Montana', code: 'MT', countryCode: 'US' },
  { label: 'Wyoming', code: 'WY', countryCode: 'US' },
  { label: 'Colorado', code: 'CO', countryCode: 'US' },
  { label: 'New Mexico', code: 'NM', countryCode: 'US' },
  { label: 'Idaho', code: 'ID', countryCode: 'US' },
  { label: 'Utah', code: 'UT', countryCode: 'US' },
  { label: 'Arizona', code: 'AZ', countryCode: 'US' },
  { label: 'Washington', code: 'WA', countryCode: 'US' },
  { label: 'Oregon', code: 'OR', countryCode: 'US' },
  { label: 'California', code: 'CA', countryCode: 'US' },
  { label: 'Nevada', code: 'NV', countryCode: 'US' },
  //
  { label: 'Oklahoma', code: 'OK', countryCode: 'US' },
  { label: 'Texas', code: 'TX', countryCode: 'US' },
  { label: 'Arkansas', code: 'AR', countryCode: 'US' },
  { label: 'Louisiana', code: 'LA', countryCode: 'US' },
  { label: 'Mississippi', code: 'MS', countryCode: 'US' },
  { label: 'Kentucky', code: 'KY', countryCode: 'US' },
  { label: 'Tennessee', code: 'TN', countryCode: 'US' },
  { label: 'Alabama', code: 'AL', countryCode: 'US' },
  { label: 'West Virginia', code: 'WV', countryCode: 'US' },
  { label: 'Georgia', code: 'GA', countryCode: 'US' },
  { label: 'Maryland', code: 'MD', countryCode: 'US' },
  { label: 'Delaware', code: 'DE', countryCode: 'US' },
  { label: 'District of Columbia', code: 'DC', countryCode: 'US' },
  { label: 'Virginia', code: 'VA', countryCode: 'US' },
  { label: 'Namibia', code: 'NA', countryCode: 'US' },
  { label: 'Seychelles', code: 'SC', countryCode: 'US' },
  { label: 'Florida', code: 'FL', countryCode: 'US' },
  //
  { label: 'Alaska', code: 'AK', countryCode: 'US' },
  { label: 'Hawaii', code: 'HI', countryCode: 'US' },
  //
  { label: 'American Samoa', code: 'AS', countryCode: 'US' },
  { label: 'Northern Mariana Islands', code: 'MP', countryCode: 'US' },
  { label: 'Guam', code: 'GU', countryCode: 'US' },
  { label: 'Puerto Rico', code: 'PR', countryCode: 'US' },
  { label: 'US Virgin Islands', code: 'VI', countryCode: 'US' },
];

export const getCountries = () =>
  [...countries].map((c) => c.label).sort((a, b) => a.localeCompare(b));
export const getCountryByLabel = (label) => countries.find((c) => c.label === label);

export const getStates = (country) =>
  states
    .filter((state) => state.countryCode === getCountryByLabel(country)?.code)
    .map((s) => s.label)
    .sort((a, b) => a.localeCompare(b));
export const getStateByLabel = (label) => states.find((c) => c.label === label);
