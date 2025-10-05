import { type ScanOllamaModelsResponse } from '@supraai/supra-message-ts/api/ollama';

export type ScanOllamaModelsInput = {
  nodeAddress: string;
  token: string;
};

export type ScanOllamaModelsOutput = ScanOllamaModelsResponse;
