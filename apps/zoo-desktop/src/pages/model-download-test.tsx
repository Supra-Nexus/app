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
import { Check, Download, Sparkles, Zap, Brain, Shield } from 'lucide-react';
import { useState } from 'react';
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

export default function ModelDownloadTestPage() {
  const { t } = useTranslation();
  const [selectedModel, setSelectedModel] = useState(ZOO_MODELS[0].id);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      setDownloadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setIsDownloading(false);
  };

  const handleSkip = () => {
    console.log('Skip clicked');
  };

  return (
    <div className="min-h-screen w-full bg-bg-primary flex items-center justify-center">
      <div className="w-full max-w-4xl px-4 py-8 sm:px-6 md:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-cyan-500/10 p-3 sm:p-4">
              <Shield className="h-8 w-8 text-cyan-500 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
            Download Your First AI Model
          </h1>
          <p className="text-sm text-text-secondary sm:text-base md:text-lg">
            Choose a private AI model that runs 100% on your device. No internet required.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {ZOO_MODELS.map((model) => {
            const isInstalled = false; // For testing, no models are installed

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
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                    <div className="flex items-center gap-2">
                      {model.icon}
                      <CardTitle className="text-base sm:text-lg">{model.name}</CardTitle>
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
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-text-secondary">Size:</span>
                      <span className="font-medium">{model.size}</span>
                    </div>
                    <div className="space-y-1">
                      {model.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                          <Sparkles className="h-3 w-3 shrink-0 text-cyan-500" />
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
          <div className="mt-4 rounded-lg bg-bg-secondary p-3 sm:mt-6 sm:p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium sm:text-sm">Downloading {selectedModel}...</span>
              <span className="text-xs text-text-secondary sm:text-sm">{downloadProgress}%</span>
            </div>
            <Progress value={downloadProgress} className="h-2" />
            <p className="mt-2 text-xs text-text-secondary">
              This may take a few minutes depending on your internet speed.
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={handleSkip}
            disabled={isDownloading}
            className="w-full sm:flex-1"
          >
            Skip for now
          </Button>
          <Button
            size="lg"
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full gap-2 sm:flex-1"
          >
            <Download className="h-4 w-4" />
            <span className="text-sm sm:text-base">
              {isDownloading ? 'Downloading...' : 'Download & Continue'}
            </span>
          </Button>
        </div>

        <div className="mt-4 rounded-lg bg-cyan-500/10 p-3 sm:mt-6 sm:p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold sm:text-base">
            <Shield className="h-4 w-4 text-cyan-500" />
            Why Local AI?
          </h3>
          <ul className="space-y-1 text-xs text-text-secondary sm:text-sm">
            <li>• Your data never leaves your device</li>
            <li>• Works offline without internet</li>
            <li>• No subscription fees or usage limits</li>
            <li>• Complete privacy and security</li>
          </ul>
        </div>
      </div>
    </div>
  );
}