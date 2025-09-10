import brandConfig from '../../brand.config.json';

export interface BrandConfig {
  name: string;
  fullName: string;
  description: string;
  website: string;
  copyright: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  models: {
    eco: ModelConfig;
    coder: ModelConfig;
    nano: ModelConfig;
  };
  features: {
    enableStore: boolean;
    enableBackgroundMode: boolean;
    enableOnboarding: boolean;
    defaultModel: 'eco' | 'coder' | 'nano';
  };
  paths: {
    nodeManager: string;
    desktop: string;
  };
}

interface ModelConfig {
  name: string;
  base: string;
  description: string;
}

// Export the brand configuration with environment variable overrides
export const BRAND: BrandConfig = {
  ...brandConfig.brand,
  name: process.env.BRAND_NAME || brandConfig.brand.name,
  fullName: process.env.BRAND_FULL_NAME || brandConfig.brand.fullName,
  description: process.env.BRAND_DESCRIPTION || brandConfig.brand.description,
  website: process.env.BRAND_WEBSITE || brandConfig.brand.website,
  copyright: process.env.BRAND_COPYRIGHT || brandConfig.brand.copyright,
  colors: {
    ...brandConfig.brand.colors,
    primary: process.env.BRAND_COLOR_PRIMARY || brandConfig.brand.colors.primary,
    secondary: process.env.BRAND_COLOR_SECONDARY || brandConfig.brand.colors.secondary,
    accent: process.env.BRAND_COLOR_ACCENT || brandConfig.brand.colors.accent,
    background: process.env.BRAND_COLOR_BACKGROUND || brandConfig.brand.colors.background,
    foreground: process.env.BRAND_COLOR_FOREGROUND || brandConfig.brand.colors.foreground,
  },
  features: {
    ...brandConfig.brand.features,
    enableStore: process.env.BRAND_ENABLE_STORE === 'true' || brandConfig.brand.features.enableStore,
    enableBackgroundMode: process.env.BRAND_ENABLE_BACKGROUND === 'true' || brandConfig.brand.features.enableBackgroundMode,
    enableOnboarding: process.env.BRAND_ENABLE_ONBOARDING === 'true' || brandConfig.brand.features.enableOnboarding,
    defaultModel: (process.env.BRAND_DEFAULT_MODEL as any) || brandConfig.brand.features.defaultModel,
  },
};

// Helper function to get model by type
export function getBrandModel(type: 'eco' | 'coder' | 'nano'): ModelConfig {
  return BRAND.models[type];
}

// Helper function to get all brand models
export function getAllBrandModels(): ModelConfig[] {
  return Object.values(BRAND.models);
}

// Helper to check if a feature is enabled
export function isFeatureEnabled(feature: keyof BrandConfig['features']): boolean {
  return BRAND.features[feature] as boolean;
}