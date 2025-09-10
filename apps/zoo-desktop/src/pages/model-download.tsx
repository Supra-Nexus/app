import { useTranslation } from '@zooai/zoo-i18n';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Badge,
} from '@zooai/zoo-ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { Check, Download, Sparkles, Zap, Brain, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OnboardingStep } from '../components/onboarding/constants';
import { useSettings } from '../store/settings';
import { useAuth } from '../store/auth';
import {
  useOllamaListQuery,
  useOllamaPullMutation,
  useOllamaPullingQuery,
} from '../lib/zoo-node-manager/ollama-client';
import { zooNodeQueryClient } from '../lib/zoo-node-manager/zoo-node-manager-client';
import { cn } from '@zooai/zoo-ui/utils';

// Define the Zoo branded models we want users to download
const ZOO_MODELS = [
  {
    id: 'qwen3:4b-thinking-2507',
    name: 'Zoo Eco',
    description: '🌱 Your private AI assistant with advanced reasoning',
    size: '2.4 GB',
    icon: <Brain className="h-5 w-5" />,
    features: ['Advanced reasoning', 'Code generation', 'Creative writing'],
    recommended: true,
  },
  {
    id: 'qwen3:0.6b',
    name: 'Zoo Nano-1',
    description: '⚡ Ultra-lightweight for instant responses',
    size: '395 MB',
    icon: <Zap className="h-5 w-5" />,
    features: ['Fast responses', 'Low memory', 'Basic tasks'],
    recommended: false,
  },
  {
    id: 'hermes-4:70b',
    name: 'Zoo Coder',
    description: '💻 Professional coding assistant',
    size: '40 GB',
    icon: <Brain className="h-5 w-5" />,
    features: ['Expert coding', 'Large context', 'Multi-language'],
    recommended: false,
  },
];

export default function ModelDownloadPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth((state) => state.auth);
  const completeStep = useSettings((state) => state.completeStep);
  const [selectedModel, setSelectedModel] = useState(ZOO_MODELS[0].id);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const ollamaConfig = {
    host: auth?.node_address || 'http://localhost:11435',
  };

  const { data: installedModels, refetch: refetchModels } = useOllamaListQuery(ollamaConfig);
  const { data: pullingModels } = useOllamaPullingQuery();
  const pullMutation = useOllamaPullMutation(ollamaConfig);

  // Check if at least one Zoo model is installed
  const hasInstalledModel = installedModels?.models?.some((model) =>
    ZOO_MODELS.some((zooModel) => model.name.includes(zooModel.id.split(':')[0]))
  );

  useEffect(() => {
    // If a model is already installed, mark step as complete and navigate
    if (hasInstalledModel && !isDownloading) {
      completeStep(OnboardingStep.MODEL_DOWNLOAD, {
        modelName: selectedModel,
        downloaded: true,
      });
      navigate('/home');
    }
  }, [hasInstalledModel, isDownloading]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const generator = await pullMutation.mutateAsync({ model: selectedModel });
      
      for await (const progress of generator) {
        if (progress.total && progress.completed) {
          const percent = Math.round((progress.completed / progress.total) * 100);
          setDownloadProgress(percent);
        }
        
        if (progress.status === 'success') {
          await refetchModels();
          completeStep(OnboardingStep.MODEL_DOWNLOAD, {
            modelName: selectedModel,
            downloaded: true,
          });
          navigate('/home');
          break;
        }
      }
    } catch (error) {
      console.error('Failed to download model:', error);
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleSkip = () => {
    // Skip the download but still mark as complete
    completeStep(OnboardingStep.MODEL_DOWNLOAD, {
      modelName: '',
      downloaded: false,
    });
    navigate('/home');
  };

  return (
    <QueryClientProvider client={zooNodeQueryClient}>
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-cyan-900/10 via-bg-primary to-purple-900/10">
        <div className="w-full max-w-4xl px-8">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-cyan-500/10 p-4">
                <Shield className="h-12 w-12 text-cyan-500" />
              </div>
            </div>
            <h1 className="mb-2 text-4xl font-bold">Download Your First AI Model</h1>
            <p className="text-lg text-text-secondary">
              Choose a private AI model that runs 100% on your device. No internet required.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {ZOO_MODELS.map((model) => {
              const isInstalled = installedModels?.models?.some((m) =>
                m.name.includes(model.id.split(':')[0])
              );

              return (
                <Card
                  key={model.id}
                  className={cn(
                    'cursor-pointer border-2 transition-all',
                    selectedModel === model.id
                      ? 'border-cyan-500 bg-cyan-500/5'
                      : 'border-border hover:border-border-hover',
                    isInstalled && 'opacity-75'
                  )}
                  onClick={() => !isInstalled && setSelectedModel(model.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {model.icon}
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                      </div>
                      {model.recommended && (
                        <Badge variant="default" className="bg-cyan-500">
                          Recommended
                        </Badge>
                      )}
                      {isInstalled && (
                        <Badge variant="success" className="bg-green-500">
                          <Check className="mr-1 h-3 w-3" />
                          Installed
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      {model.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Size:</span>
                        <span className="font-medium">{model.size}</span>
                      </div>
                      <div className="space-y-1">
                        {model.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Sparkles className="h-3 w-3 text-cyan-500" />
                            <span className="text-text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {isDownloading && (
            <div className="mt-6 rounded-lg bg-bg-secondary p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Downloading {selectedModel}...</span>
                <span className="text-sm text-text-secondary">{downloadProgress}%</span>
              </div>
              <Progress value={downloadProgress} className="h-2" />
              <p className="mt-2 text-xs text-text-secondary">
                This may take a few minutes depending on your internet speed.
              </p>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={handleSkip}
              disabled={isDownloading}
              className="flex-1"
            >
              Skip for now
            </Button>
            <Button
              size="lg"
              onClick={handleDownload}
              disabled={isDownloading || hasInstalledModel}
              className="flex-1 gap-2"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? 'Downloading...' : 'Download & Continue'}
            </Button>
          </div>

          <div className="mt-6 rounded-lg bg-cyan-500/10 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold">
              <Shield className="h-4 w-4 text-cyan-500" />
              Why Local AI?
            </h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• Your data never leaves your device</li>
              <li>• Works offline without internet</li>
              <li>• No subscription fees or usage limits</li>
              <li>• Complete privacy and security</li>
            </ul>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}