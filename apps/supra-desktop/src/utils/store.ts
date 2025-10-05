import config from '../config';

export const SUPRA_STORE_URL = config.isDev
  ? 'http://localhost:3000'
  : import.meta.env.VITE_SUPRA_STORE_URL || 'https://store.supra.ngo';
