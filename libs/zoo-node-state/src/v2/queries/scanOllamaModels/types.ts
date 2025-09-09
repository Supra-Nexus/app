import { type ScanOllamaModelsResponse } from '@zooai/zoo-message-ts/api/ollama';

export type ScanOllamaModelsInput = {
  nodeAddress: string;
  token: string;
};

export type ScanOllamaModelsOutput = ScanOllamaModelsResponse;
