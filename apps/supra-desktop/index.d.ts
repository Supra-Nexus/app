import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    resources: typeof import('../../libs/supra-i18n/src/lib/resources').default;
    defaultNS: 'translation';
  }
}
