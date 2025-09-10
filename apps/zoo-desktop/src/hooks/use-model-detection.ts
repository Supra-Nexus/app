import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../store/auth';
import { useSettings } from '../store/settings';
import { OnboardingStep } from '../components/onboarding/constants';
import { useOllamaListQuery } from '../lib/zoo-node-manager/ollama-client';

// Models we expect to be installed for a good experience
const REQUIRED_MODELS = ['qwen3', 'hermes-4'];

export function useModelDetection() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth((state) => state.auth);
  const isStepCompleted = useSettings((state) => state.isStepCompleted);
  const isOnboardingComplete = useSettings((state) => state.isOnboardingComplete);
  
  const ollamaConfig = {
    host: auth?.node_address || 'http://localhost:11435',
  };

  const { data: installedModels, isLoading } = useOllamaListQuery(
    ollamaConfig,
    {
      enabled: !!auth && isOnboardingComplete(),
      refetchInterval: 5000, // Check every 5 seconds
    }
  );

  useEffect(() => {
    // Skip if we're still loading or if user is not authenticated
    if (isLoading || !auth) return;
    
    // Skip if onboarding is not complete
    if (!isOnboardingComplete()) return;
    
    // Skip if we're already on the model download page
    if (location.pathname === '/model-download') return;
    
    // Skip if we're on certain routes where we don't want to interrupt
    const skipRoutes = ['/terms-conditions', '/analytics', '/quick-connection', '/restore'];
    if (skipRoutes.includes(location.pathname)) return;

    // Check if any required models are installed
    const hasRequiredModel = installedModels?.models?.some((model) =>
      REQUIRED_MODELS.some((required) => model.name.includes(required))
    );

    // If no required models are installed and model download step wasn't completed
    if (!hasRequiredModel && !isStepCompleted(OnboardingStep.MODEL_DOWNLOAD)) {
      // Navigate to model download page
      navigate('/model-download');
    }
  }, [
    installedModels,
    isLoading,
    auth,
    isOnboardingComplete,
    isStepCompleted,
    location.pathname,
    navigate,
  ]);

  return {
    hasModels: installedModels?.models && installedModels.models.length > 0,
    installedModels: installedModels?.models || [],
    isLoading,
  };
}