import config from '../config';

export const ZOO_STORE_URL = config.isDev
  ? 'http://localhost:3000'
  : import.meta.env.VITE_ZOO_STORE_URL || 'https://store.zoo.ngo';
