import { useTranslation } from '@supraai/supra-i18n';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from '@supraai/supra-ui';
import { Check, Circle, Sparkles, Zap, Brain, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { OnboardingStep } from '../components/onboarding/constants';
import { useSettings } from '../store/settings';
import { cn } from '@supraai/supra-ui/utils';

const ONBOARDING_STEPS = [
  {
    id: OnboardingStep.WELCOME,
    title: 'Welcome to Supra AI',
    description: 'Get started with your private AI assistant',
    icon: <Sparkles className="h-5 w-5" />,
    completed: true,
  },
  {
    id: OnboardingStep.AUTH,
    title: 'Account Setup',
    description: 'Create or connect your account',
    icon: <Shield className="h-5 w-5" />,
    completed: true,
  },
  {
    id: OnboardingStep.MODEL_DOWNLOAD,
    title: 'Download AI Model',
    description: 'Choose and download your first AI model',
    icon: <Brain className="h-5 w-5" />,
    completed: false,
  },
  {
    id: OnboardingStep.READY,
    title: 'Ready to Go',
    description: 'Start chatting with your AI assistant',
    icon: <Zap className="h-5 w-5" />,
    completed: false,
  },
];

export default function OnboardingChecklistPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const settings = useSettings();
  const [currentStep, setCurrentStep] = useState(2); // Model download is next
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Add entrance animation
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const handleContinue = () => {
    // Mark this step as complete
    settings.completeStep(OnboardingStep.ONBOARDING_CHECKLIST, true);
    // Navigate to model download page
    navigate('/model-download');
  };

  const progress = (currentStep / ONBOARDING_STEPS.length) * 100;

  return (
    <div className="min-h-screen w-full bg-bg-primary">
      {/* Mobile-responsive container */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">
            Getting Started with Supra AI
          </h1>
          <p className="text-sm text-text-secondary sm:text-base md:text-lg">
            Complete these simple steps to start using your private AI assistant
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Setup Progress</span>
            <span className="text-text-secondary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Checklist Cards */}
        <div className="space-y-4">
          {ONBOARDING_STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <Card
                key={step.id}
                className={cn(
                  'transition-all duration-300',
                  isAnimating && 'translate-y-4 opacity-0',
                  isCurrent && 'border-cyan-500 bg-cyan-500/5 shadow-lg',
                  isCompleted && 'opacity-75'
                )}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
                        isCompleted && 'bg-green-500/20 text-green-500',
                        isCurrent && 'bg-cyan-500/20 text-cyan-500',
                        isPending && 'bg-border text-text-secondary'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : isCurrent ? (
                        step.icon
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <CardTitle className="text-base sm:text-lg">
                        {step.title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        {step.description}
                      </CardDescription>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {isCompleted && (
                        <span className="text-xs font-medium text-green-500">
                          Completed
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-xs font-medium text-cyan-500">
                          Next Step
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              settings.completeStep(OnboardingStep.ONBOARDING_CHECKLIST, true);
              settings.completeStep(OnboardingStep.MODEL_DOWNLOAD, { modelName: '', downloaded: false });
              navigate('/home');
            }}
            className="w-full sm:w-auto"
          >
            Skip Setup
          </Button>
          <Button
            size="lg"
            onClick={handleContinue}
            className="w-full gap-2 sm:w-auto"
          >
            Continue Setup
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Info Box */}
        <div className="mt-8 rounded-lg bg-cyan-500/10 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold sm:text-base">
            <Shield className="h-4 w-4 text-cyan-500" />
            Why Supra AI?
          </h3>
          <ul className="space-y-1 text-xs text-text-secondary sm:text-sm">
            <li>• 100% private - Your data never leaves your device</li>
            <li>• Works offline without internet connection</li>
            <li>• No subscription fees or usage limits</li>
            <li>• Advanced AI models optimized for your hardware</li>
          </ul>
        </div>
      </div>
    </div>
  );
}