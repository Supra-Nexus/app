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
import { Check, Download, Sparkles, Zap, Brain, Shield, Server, Lock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OnboardingStep } from '../components/onboarding/constants';
import { useSettings } from '../store/settings';
import { useAuth } from '../store/auth';
import { invoke } from '@tauri-apps/api/core';
import {
  useOllamaListQuery,
  useOllamaPullMutation,
  useOllamaPullingQuery,
} from '../lib/zoo-node-manager/ollama-client';
import { zooNodeQueryClient } from '../lib/zoo-node-manager/zoo-node-manager-client';
import { cn } from '@zooai/zoo-ui/utils';

// Define the Zoo branded models we want users to download
// Using Qwen3-Coder models with A3B (Approximate 3B) technology for efficiency
// These provide large model capability in smaller sizes through advanced quantization
// You can fork these to HuggingFace as zoo-ai/zoo-nano-1, zoo-ai/zoo-eco-1, zoo-ai/zoo-coder-1
const ZOO_MODELS = [
  {
    id: 'qwen3-coder:1b-instruct', // Qwen3-Coder 1B Instruct - ultra-light
    name: 'Zoo Nano-1',
    description: '⚡ Ultra-lightweight for instant responses',
    size: '700 MB',
    icon: <Zap className="h-5 w-5" />,
    features: ['Fast responses', 'Low memory', 'Basic coding'],
    recommended: false,
  },
  {
    id: 'qwen3-coder:7b-a3b-instruct', // Qwen3-Coder 7B-A3B - 7B compressed to ~3B size
    name: 'Zoo Eco-1',
    description: '🌱 Advanced AI with 7B capability in 3B size',
    size: '2.4 GB',
    icon: <Brain className="h-5 w-5" />,
    features: ['7B-level reasoning', 'Efficient coding', 'A3B compression'],
    recommended: true,
  },
  {
    id: 'qwen3-coder:30b-a3b-instruct', // Qwen3-Coder 30B-A3B - 30B compressed to ~3B size!
    name: 'Zoo Coder-1',
    description: '💻 Enterprise-grade AI with 30B capability',
    size: '3.2 GB',
    icon: <Brain className="h-5 w-5" />,
    features: ['30B-level coding', 'A3B technology', 'Production ready'],
    recommended: false,
  },
];

export default function ModelDownloadPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth((state) => state.auth);
  const completeStep = useSettings((state) => state.completeStep);
  const [selectedModel, setSelectedModel] = useState(ZOO_MODELS[1].id); // Default to Zoo Eco-1 (recommended)
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [hardwareCapabilities, setHardwareCapabilities] = useState({
    hasNvidiaTEE: false,
    hasH100: false,
    hasBlackwellTEE: false,
    canJoinMainnet: false,
    canPublicTraining: false,
    confidentialComputeAvailable: false,
  });
  const [mainnetEnabled, setMainnetEnabled] = useState(false);

  const ollamaConfig = {
    host: 'http://localhost:2000', // Zoo node runs on port 2000
  };

  const { data: installedModels, refetch: refetchModels } = useOllamaListQuery(ollamaConfig);
  const { data: pullingModels } = useOllamaPullingQuery();
  const pullMutation = useOllamaPullMutation(ollamaConfig);

  // Check if at least one Zoo model is installed
  const hasInstalledModel = installedModels?.models?.some((model) =>
    ZOO_MODELS.some((zooModel) => model.name.includes(zooModel.id.split(':')[0]))
  );

  // Check hardware capabilities and Ollama connection on mount
  useEffect(() => {
    const checkHardware = async () => {
      try {
        // Check for NVIDIA GPU and TEE support
        const gpuInfo = await invoke('get_gpu_info').catch(() => null);
        const hasNvidia = gpuInfo?.includes('NVIDIA') || false;
        const hasH100 = gpuInfo?.includes('H100') || false;
        const hasBlackwell = gpuInfo?.includes('Blackwell') || gpuInfo?.includes('B100') || gpuInfo?.includes('B200') || false;
        // Blackwell GPUs with TEE IO are required for public AI chain
        const hasBlackwellTEE = hasBlackwell && gpuInfo?.includes('TEE');
        // H100 and other GPUs can be used for public training and local private inference
        const hasTEE = hasNvidia && (hasBlackwellTEE || hasH100 || gpuInfo?.includes('TEE'));
        
        setHardwareCapabilities({
          hasNvidiaTEE: hasTEE,
          hasH100: hasH100,
          hasBlackwellTEE: hasBlackwellTEE,
          canJoinMainnet: hasBlackwellTEE, // Only Blackwell with TEE can join public AI chain
          canPublicTraining: hasH100 || hasBlackwell, // H100 and Blackwell can do public training
          confidentialComputeAvailable: hasTEE,
        });
      } catch (error) {
        console.log('Hardware detection failed, running in local-only mode');
      }
    };
    
    const checkOllamaConnection = async () => {
      try {
        console.log('Testing Ollama connection at:', ollamaConfig.host);
        const response = await fetch(`${ollamaConfig.host}/api/tags`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          console.log('Ollama is running and accessible');
          const data = await response.json();
          console.log('Available models:', data);
        } else {
          console.error('Ollama connection failed:', response.status, response.statusText);
          console.error('Zoo node is not running on port 2000. Please ensure the Zoo node is running.');
        }
      } catch (error) {
        console.error('Failed to connect to Zoo node:', error);
        console.error('Cannot connect to Zoo node on port 2000. The Zoo node may not be running.');
      }
    };
    
    checkHardware();
    checkOllamaConnection();
  }, [ollamaConfig.host]);

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
    console.log('Starting download for model:', selectedModel);
    console.log('Ollama config:', ollamaConfig);
    
    // First check if Zoo node is running
    try {
      const testResponse = await fetch(`${ollamaConfig.host}/api/tags`);
      if (!testResponse.ok) {
        console.error('Zoo node is not responding. Please ensure it is running on port 2000');
        alert('Zoo node is not running. Please start the Zoo node and try again.');
        return;
      }
    } catch (error) {
      console.error('Cannot connect to Zoo node:', error);
      alert('Cannot connect to Zoo node on port 2000. Please ensure the Zoo node is running.');
      return;
    }
    
    setIsDownloading(true);
    setDownloadProgress(0);
    
    try {
      console.log('Initiating pull mutation for model:', selectedModel);
      const generator = await pullMutation.mutateAsync({ model: selectedModel });
      
      console.log('Generator created, starting download loop...');
      for await (const progress of generator) {
        console.log('Download progress:', progress);
        
        if (progress.total && progress.completed) {
          const percent = Math.round((progress.completed / progress.total) * 100);
          setDownloadProgress(percent);
        } else if (progress.status) {
          // Handle status messages
          console.log('Download status:', progress.status);
          
          // Update progress based on status
          if (progress.status.includes('pulling')) {
            console.log('Pulling model from registry...');
          } else if (progress.status.includes('verifying')) {
            console.log('Verifying model...');
          }
        }
        
        if (progress.status === 'success' || progress.digest) {
          console.log('Download completed successfully');
          await refetchModels();
          completeStep(OnboardingStep.MODEL_DOWNLOAD, {
            modelName: selectedModel,
            downloaded: true,
          });
          navigate('/home');
          break;
        }
      }
    } catch (error: any) {
      console.error('Failed to download model:', error);
      console.error('Error details:', error?.message || error);
      console.error('Error stack:', error?.stack);
      console.error('Make sure the Zoo node is running on port 2000');
      
      // Show user-friendly error message
      const errorMessage = error?.message || 'Failed to download model';
      alert(`Error: ${errorMessage}\n\nPlease ensure the Zoo node is running on port 2000.`);
      
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
      <div className="min-h-screen w-full bg-bg-primary flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-6xl mx-auto p-6 py-12">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Download Your First AI Model
            </h1>
            <p className="text-sm sm:text-base text-text-secondary mt-2">
              Choose a private AI model that runs 100% on your device
            </p>
          </div>

          {/* Hardware Status Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            {hardwareCapabilities.hasBlackwellTEE && (
              <Badge variant="success" className="bg-purple-500/10 text-purple-500 border-purple-500 px-2 py-0.5 text-xs">
                <Server className="mr-1 h-3 w-3" />
                Blackwell TEE IO
              </Badge>
            )}
            {hardwareCapabilities.hasH100 && (
              <Badge variant="success" className="bg-green-500/10 text-green-500 border-green-500 px-2 py-0.5 text-xs">
                <Server className="mr-1 h-3 w-3" />
                NVIDIA H100
              </Badge>
            )}
            {hardwareCapabilities.canPublicTraining && (
              <Badge variant="default" className="bg-blue-500/10 text-blue-500 border-blue-500 px-2 py-0.5 text-xs">
                <Brain className="mr-1 h-3 w-3" />
                Public Training
              </Badge>
            )}
            {hardwareCapabilities.canJoinMainnet ? (
              <Badge variant="success" className="bg-cyan-500/10 text-cyan-500 border-cyan-500 px-2 py-0.5 text-xs">
                <Server className="mr-1 h-3 w-3" />
                Public AI Chain Ready
              </Badge>
            ) : hardwareCapabilities.confidentialComputeAvailable ? (
              <Badge variant="default" className="bg-amber-500/10 text-amber-500 border-amber-500 px-2 py-0.5 text-xs">
                <Lock className="mr-1 h-3 w-3" />
                Private Inference Only
              </Badge>
            ) : (
              <Badge variant="outline" className="text-text-secondary border-border px-2 py-0.5 text-xs">
                <Shield className="mr-1 h-3 w-3" />
                Local Mode Only
              </Badge>
            )}
          </div>

          <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 mb-4">
            {ZOO_MODELS.map((model) => {
              const isInstalled = installedModels?.models?.some((m) =>
                m.name.includes(model.id.split(':')[0])
              );

              return (
                <Card
                  key={model.id}
                  className={cn(
                    'relative cursor-pointer border transition-all duration-200',
                    selectedModel === model.id
                      ? 'border-cyan-500 bg-cyan-500/5 ring-2 ring-cyan-500/20'
                      : 'border-border hover:border-cyan-500/50',
                    isInstalled && 'opacity-60 cursor-not-allowed'
                  )}
                  onClick={() => !isInstalled && setSelectedModel(model.id)}
                >
                  {model.recommended && (
                    <div className="absolute -top-2 left-3 z-10">
                      <Badge className="bg-cyan-500 text-white border-0 px-2 py-0 text-[10px] font-medium">
                        Recommended
                      </Badge>
                    </div>
                  )}
                  {isInstalled && (
                    <div className="absolute -top-2 right-3 z-10">
                      <Badge className="bg-green-500 text-white border-0 px-2 py-0 text-[10px] font-medium">
                        <Check className="mr-0.5 h-2.5 w-2.5" />
                        Installed
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded bg-cyan-500/10 mt-0.5">
                        {React.cloneElement(model.icon, { className: 'h-4 w-4 text-cyan-500' })}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base font-semibold">{model.name}</CardTitle>
                        <div className="text-xs text-text-secondary mt-0.5">{model.size}</div>
                      </div>
                    </div>
                    <CardDescription className="text-xs mt-2 line-clamp-2">
                      {model.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-1">
                      {model.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <div className="h-1 w-1 rounded-full bg-cyan-500/60" />
                          <span className="text-[11px] text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              size="lg"
              variant="outline"
              onClick={handleSkip}
              disabled={isDownloading}
              className="flex-1 border border-border hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all h-11"
            >
              Skip for now
            </Button>
            <Button
              size="lg"
              onClick={handleDownload}
              disabled={isDownloading || hasInstalledModel}
              className="flex-1 gap-2 bg-cyan-500 hover:bg-cyan-600 transition-all h-11 font-medium"
            >
              {isDownloading ? (
                <>
                  <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  {hasInstalledModel ? 'Already Installed' : 'Download & Continue'}
                </>
              )}
            </Button>
          </div>

          {isDownloading && (
            <div className="mt-3">
              <Progress value={downloadProgress} className="h-1.5" />
              <p className="text-xs text-text-secondary mt-1 text-center">{downloadProgress}% complete</p>
            </div>
          )}

          {/* Why Local AI Section */}
          <div className="mt-8 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 p-5">
            <h3 className="mb-3 text-base font-semibold text-text-primary">
              Why Local AI?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <Lock className="h-3.5 w-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs text-text-primary">100% Private</div>
                  <div className="text-[10px] text-text-secondary">Your data never leaves your device</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Server className="h-3.5 w-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs text-text-primary">Works Offline</div>
                  <div className="text-[10px] text-text-secondary">No internet connection required</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs text-text-primary">Unlimited Usage</div>
                  <div className="text-[10px] text-text-secondary">No subscription fees or limits</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Brain className="h-3.5 w-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs text-text-primary">Full Control</div>
                  <div className="text-[10px] text-text-secondary">Complete ownership of your AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}