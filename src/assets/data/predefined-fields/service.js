import { getAvailableServiceTypes } from 'src/constant/service-types';
import { generatePredefinedSwitchFields } from './helper';

export const predefinedServiceFeatures = (type) => {
  const service = getAvailableServiceTypes().find((s) => s.value === type);

  if (!service) return [];

  return generatePredefinedSwitchFields(service.subtypes);
};
