// Stub for autostart functionality when the plugin is not available
// This prevents build failures in CI

export const isEnabled = async (): Promise<boolean> => {
  // Return false as default when plugin is not available
  return false;
};

export const enable = async (): Promise<void> => {
  // No-op when plugin is not available
  console.warn('Autostart plugin not available - enable() called');
};

export const disable = async (): Promise<void> => {
  // No-op when plugin is not available
  console.warn('Autostart plugin not available - disable() called');
};