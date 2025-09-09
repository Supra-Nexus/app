import { platform } from '@tauri-apps/plugin-os';

import { ModelProvider } from '../../components/ais/constants';
import OLLAMA_MODELS_REPOSITORY from './ollama-models-repository.json';

export enum OllamaModelQuality {
  Low = 'low',
  Medium = 'medium',
  Good = 'good',
}

export enum OllamaModelSpeed {
  Average = 'average',
  Fast = 'fast',
  VeryFast = 'very-fast',
}

export enum OllamaModelCapability {
  TextGeneration = 'text-generation',
  ImageToText = 'image-to-text',
  Thinking = 'thinking',
  ToolCalling = 'tool-calling',
}

export interface OllamaModel {
  model: string;
  tag: string;
  name: string;
  description: string;
  contextLength: number;
  quality: OllamaModelQuality;
  speed: OllamaModelSpeed;
  capabilities: OllamaModelCapability[];
  size: number; // Size in GB
  fullName: string;
  provider?: string;
}
export type OllamaModelDefinition =
  (typeof FILTERED_OLLAMA_MODELS_REPOSITORY)[0];

export const FILTERED_OLLAMA_MODELS_REPOSITORY =
  OLLAMA_MODELS_REPOSITORY.filter((model) => !model.embedding);
export const ALLOWED_OLLAMA_MODELS = FILTERED_OLLAMA_MODELS_REPOSITORY.flatMap(
  (model) => model.tags.map((tag) => tag.name),
);

const currentPlatform = platform();

export const OLLAMA_MODELS: OllamaModel[] = [
  // Top 10 Local Private AI Models
  {
    model: 'llama3.2',
    tag: 'latest',
    name: 'Zoo Eco-1',
    description:
      'Privacy-focused local AI for general chat and reasoning. Runs entirely on your device with no external connections.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 2.0,
    fullName: '',
    provider: ModelProvider['Zoo-Backend'],
  },
  {
    model: 'qwen2.5-coder',
    tag: 'latest',
    name: 'Zoo Coder-1',
    description:
      'Privacy-focused local AI for coding. Excellent at code generation, debugging, and technical assistance.',
    contextLength: 32768,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 4.7,
    fullName: '',
    provider: ModelProvider['Zoo-Backend'],
  },
  {
    model: 'llama3.3',
    tag: '70b',
    name: 'Llama 3.3 70B',
    description:
      'Meta\'s latest and most capable open model with excellent reasoning and instruction following.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 40.0,
    fullName: '',
    provider: ModelProvider.Meta,
  },
  {
    model: 'qwen2.5',
    tag: '32b',
    name: 'Qwen 2.5 32B',
    description:
      'Alibaba\'s flagship model with strong multilingual capabilities and excellent reasoning.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 18.5,
    fullName: '',
    provider: ModelProvider.Qwen,
  },
  {
    model: 'qwen2.5-coder',
    tag: '32b',
    name: 'Qwen Coder 32B',
    description:
      'Advanced coding model from Alibaba. Excellent for complex programming tasks and code analysis.',
    contextLength: 32768,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 19.0,
    fullName: '',
    provider: ModelProvider.Qwen,
  },
  {
    model: 'glm4',
    tag: '9b',
    name: 'GLM-4 9B',
    description:
      'Zhipu AI\'s bilingual model with strong Chinese and English capabilities.',
    contextLength: 128000,
    quality: OllamaModelQuality.Medium,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 5.5,
    fullName: '',
    provider: ModelProvider.Google, // Using Google icon as placeholder
  },
  {
    model: 'mixtral',
    tag: '8x7b',
    name: 'Mixtral 8x7B',
    description:
      'Mistral\'s mixture-of-experts model with excellent performance and efficiency.',
    contextLength: 32768,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 26.0,
    fullName: '',
    provider: ModelProvider.Mistral,
  },
  {
    model: 'codestral',
    tag: 'latest',
    name: 'Codestral',
    description:
      'Mistral\'s specialized coding model. Optimized for code generation and software development.',
    contextLength: 32768,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 22.0,
    fullName: '',
    provider: ModelProvider.Mistral,
  },
  {
    model: 'deepseek-r1',
    tag: '14b',
    name: 'DeepSeek R1 14B',
    description:
      'Powerful reasoning model with chain-of-thought capabilities for complex problem solving.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.Thinking,
      OllamaModelCapability.ToolCalling,
    ],
    size: 8.9,
    fullName: '',
    provider: ModelProvider.DeepSeek,
  },
  {
    model: 'phi3',
    tag: 'medium',
    name: 'Phi-3 Medium',
    description:
      'Microsoft\'s efficient small language model with impressive capabilities for its size.',
    contextLength: 128000,
    quality: OllamaModelQuality.Medium,
    speed: OllamaModelSpeed.VeryFast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
    ],
    size: 7.9,
    fullName: '',
    provider: ModelProvider.OpenAI, // Using OpenAI icon as placeholder for Microsoft
  },
].map((model) => {
  model.fullName = `${model.model}:${model.tag}` as const;
  return model;
});
