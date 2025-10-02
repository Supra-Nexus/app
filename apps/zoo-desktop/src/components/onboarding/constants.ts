export enum OnboardingStep {
  TERMS_CONDITIONS = 'terms-conditions',
  ANALYTICS = 'analytics',
  ONBOARDING_CHECKLIST = 'onboarding-checklist',
  MODEL_DOWNLOAD = 'model-download',
}

export type OnboardingStepConfig = {
  id: OnboardingStep;
  path: string;
  required: boolean;
};

export const COMPLETION_DESTINATION = '/home';

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    id: OnboardingStep.TERMS_CONDITIONS,
    path: '/terms-conditions',
    required: true,
  },
  {
    id: OnboardingStep.MODEL_DOWNLOAD,
    path: '/model-download',
    required: true,
  },
];

export enum ProviderSelectionUser {
  CLOUD = 'cloud',
  LOCAL = 'local',
  FREE = 'free',
}

type TermsChoice = boolean;
type AnalyticsChoice = boolean;
type OnboardingChecklistChoice = boolean;
type ModelDownloadChoice = { modelName: string; downloaded: boolean };

export type StepChoiceMap = {
  [OnboardingStep.TERMS_CONDITIONS]: TermsChoice | null;
  [OnboardingStep.ANALYTICS]: AnalyticsChoice | null;
  [OnboardingStep.ONBOARDING_CHECKLIST]: OnboardingChecklistChoice | null;
  [OnboardingStep.MODEL_DOWNLOAD]: ModelDownloadChoice | null;
  // [OnboardingStep.AI_PROVIDER_SELECTION]: AIProviderChoice | null;
  // [OnboardingStep.COMPLETE]: null;
};

export type OnboardingState = {
  steps: {
    [K in OnboardingStep]?: {
      completed: boolean;
      choice: StepChoiceMap[K];
    };
  };
};

export function validateChoice<T extends OnboardingStep>(
  stepId: T,
  choice: any,
): StepChoiceMap[T] {
  switch (stepId) {
    case OnboardingStep.TERMS_CONDITIONS:
      return (typeof choice === 'boolean' ? choice : null) as StepChoiceMap[T];
    case OnboardingStep.ANALYTICS:
      return (typeof choice === 'boolean' ? choice : null) as StepChoiceMap[T];
    case OnboardingStep.ONBOARDING_CHECKLIST:
      return (typeof choice === 'boolean' ? choice : null) as StepChoiceMap[T];
    case OnboardingStep.MODEL_DOWNLOAD:
      return (typeof choice === 'object' && choice?.modelName && typeof choice?.downloaded === 'boolean' 
        ? choice 
        : null) as StepChoiceMap[T];
    default:
      return null as StepChoiceMap[T];
  }
}
