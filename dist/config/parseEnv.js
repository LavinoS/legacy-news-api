import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import logger from '../utils/logger';
import { getString, getBooleanIfValid, getNumberIfValid } from '../services/parseService.js';
import envSettings from '../../config/env.json';
const converters = {
  string: value => getString(value),
  boolean: value => getBooleanIfValid(value),
  number: value => getNumberIfValid(value)
};
const developerMode = converters.boolean(envSettings.DEVELOPER_MODE) || false;
export default ((envKey, valueType = 'string', required = !developerMode) => {
  const envValue = envSettings[envKey];
  if (required && (isNull(envValue) || isUndefined(envValue))) {
    logger.error(`[BOOT] Missing value for env variable "${envKey}"`);
    throw new Error(`Missing environment variable ${envKey}`);
  }
  const valueConverter = converters[valueType] || converters.string;
  const value = valueConverter(envValue);
  if (required && isNull(value)) {
    logger.error(`[BOOT] Invalid value for env variable "${envKey}" : "${value}"`);
    throw new Error(`Invalid value for environment variable ${envKey} : "${value}"`);
  }
  return value;
});