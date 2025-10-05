import { type ScanOllamaModelsResponse } from '@supra_network/hanzo-message-ts/api/ollama';

export type ScanOllamaModelsInput = {
  nodeAddress: string;
  token: string;
};

export type ScanOllamaModelsOutput = ScanOllamaModelsResponse;
