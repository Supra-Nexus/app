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

// Platform check removed - not needed here

// Pre-installed models for onboarding selection
export const PREINSTALLED_MODELS: OllamaModel[] = [
  // Zoo branded models
  {
    model: 'qwen3',
    tag: '4b-thinking-2507',
    name: 'Zoo Eco',
    description:
      '🌱 Your private AI assistant. Advanced reasoning with Qwen3 4B Thinking. Runs entirely on your device - no cloud, no tracking, completely free.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.Thinking,
      OllamaModelCapability.ToolCalling,
    ],
    size: 2.5,
    fullName: '',
    provider: ModelProvider['Zoo-Backend'],
  },
  {
    model: 'hermes-4',
    tag: '70b',
    name: 'Zoo Coder',
    description:
      '💻 Professional coding assistant powered by Hermes 4 70B. Expert-level code generation, debugging, and architecture design. 100% private and local.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 40.0,
    fullName: '',
    provider: ModelProvider['Zoo-Backend'],
  },
  {
    model: 'qwen3',
    tag: '0.6b',
    name: 'Zoo Nano-1',
    description:
      '⚡ Ultra-lightweight for instant responses. Perfect for quick tasks on any device. Less than 1GB RAM required. Your always-ready AI companion.',
    contextLength: 128000,
    quality: OllamaModelQuality.Low,
    speed: OllamaModelSpeed.VeryFast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
    ],
    size: 0.4,
    fullName: '',
    provider: ModelProvider['Zoo-Backend'],
  },
];

export const OLLAMA_MODELS: OllamaModel[] = [
  ...PREINSTALLED_MODELS,
  // Advanced reasoning models
  {
    model: 'seed-oss',
    tag: '36b',
    name: 'Seed OSS 36B',
    description:
      '🧠 ByteDance\'s powerful reasoning model. State-of-the-art problem solving and analysis. Free, private, and runs on your hardware.',
    contextLength: 256000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.Thinking,
      OllamaModelCapability.ToolCalling,
    ],
    size: 21.0,
    fullName: '',
    provider: ModelProvider.DeepSeek,
  },
  {
    model: 'qwen3',
    tag: '4b-2507',
    name: 'Qwen3 4B',
    description:
      'Balanced model for everyday tasks. Excellent quality-to-size ratio. Runs smoothly on mid-range hardware.',
    contextLength: 128000,
    quality: OllamaModelQuality.Medium,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 2.3,
    fullName: '',
    provider: ModelProvider.Qwen,
  },
  {
    model: 'gpt-oss',
    tag: '20b',
    name: 'GPT OSS 20B',
    description:
      'OpenAI\'s open-source contribution. ChatGPT-like capabilities running entirely offline on your machine.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 12.0,
    fullName: '',
    provider: ModelProvider.OpenAI,
  },
  // Specialized coding models
  {
    model: 'qwen3-coder',
    tag: '30b',
    name: 'Qwen3 Coder 30B',
    description:
      'Advanced code generation and analysis. Supports 90+ programming languages with deep understanding.',
    contextLength: 32768,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 17.5,
    fullName: '',
    provider: ModelProvider.Qwen,
  },
  {
    model: 'qwen3',
    tag: '30b-a3b-2507',
    name: 'Qwen3 30B-A3B',
    description:
      'Optimized 30B model with A3B compression. Professional capabilities at half the memory requirement.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 3.0,
    fullName: '',
    provider: ModelProvider.Qwen,
  },
  {
    model: 'devstral',
    tag: '22b',
    name: 'Devstral 22B',
    description:
      'Mistral\'s developer-focused model. Expert at code review, refactoring, and system design.',
    contextLength: 32768,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 13.0,
    fullName: '',
    provider: ModelProvider.Mistral,
  },
  // Large scale models
  {
    model: 'llama3.3',
    tag: '70b',
    name: 'Llama 3.3 70B',
    description:
      'Meta\'s flagship open model. Exceptional reasoning and instruction following for complex tasks.',
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
    model: 'qwq',
    tag: '32b',
    name: 'QwQ 32B',
    description:
      'Alibaba\'s reasoning specialist. Deep thinking capabilities with step-by-step problem solving.',
    contextLength: 32768,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.Thinking,
      OllamaModelCapability.ToolCalling,
    ],
    size: 18.5,
    fullName: '',
    provider: ModelProvider.Qwen,
  },
  {
    model: 'mistral-large',
    tag: '2',
    name: 'Mistral Large 2',
    description:
      'Mistral\'s most capable model. Superior performance on complex reasoning and creative tasks.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 123.0,
    fullName: '',
    provider: ModelProvider.Mistral,
  },
  // Specialized models
  {
    model: 'deepseek-r1',
    tag: '70b',
    name: 'DeepSeek R1 70B',
    description:
      'Advanced reasoning with transparent thinking process. Shows its work for complex problem solving.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.Thinking,
      OllamaModelCapability.ToolCalling,
    ],
    size: 40.0,
    fullName: '',
    provider: ModelProvider.DeepSeek,
  },
  {
    model: 'phi4',
    tag: '14b',
    name: 'Phi-4 14B',
    description:
      'Microsoft\'s latest efficient model. Impressive capabilities for its size, perfect for edge devices.',
    contextLength: 128000,
    quality: OllamaModelQuality.Medium,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 8.5,
    fullName: '',
    provider: ModelProvider.OpenAI,
  },
  {
    model: 'gemma2',
    tag: '27b',
    name: 'Gemma 2 27B',
    description:
      'Google\'s open model with strong performance across diverse tasks. Excellent for general use.',
    contextLength: 8192,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 16.0,
    fullName: '',
    provider: ModelProvider.Google,
  },
  {
    model: 'command-r',
    tag: '35b',
    name: 'Command-R 35B',
    description:
      'Cohere\'s retrieval-focused model. Optimized for RAG and document analysis tasks.',
    contextLength: 128000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Fast,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 20.0,
    fullName: '',
    provider: ModelProvider.Anthropic,
  },
  {
    model: 'mixtral',
    tag: '8x22b',
    name: 'Mixtral 8x22B',
    description:
      'Mistral\'s massive MoE model. Exceptional performance with efficient inference through expert routing.',
    contextLength: 65536,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 141.0,
    fullName: '',
    provider: ModelProvider.Mistral,
  },
  {
    model: 'claude-oss',
    tag: '33b',
    name: 'Claude OSS 33B',
    description:
      'Community implementation of Claude-like capabilities. Helpful, harmless, and honest AI assistant.',
    contextLength: 100000,
    quality: OllamaModelQuality.Good,
    speed: OllamaModelSpeed.Average,
    capabilities: [
      OllamaModelCapability.TextGeneration,
      OllamaModelCapability.ToolCalling,
    ],
    size: 19.0,
    fullName: '',
    provider: ModelProvider.Anthropic,
  },
].map((model) => {
  model.fullName = `${model.model}:${model.tag}` as const;
  return model;
});
