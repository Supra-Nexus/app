export enum SupraNodeManagerEvent {
  StartingSupraNode = 'StartingSupraNode',
  SupraNodeStarted = 'SupraNodeStarted',
  SupraNodeStartError = 'SupraNodeStartError',

  StartingOllama = 'StartingOllama',
  OllamaStarted = 'OllamaStarted',
  OllamaStartError = 'OllamaStartError',

  PullingModelStart = 'PullingModelStart',
  PullingModelProgress = 'PullingModelProgress',
  PullingModelDone = 'PullingModelDone',
  PullingModelError = 'PullingModelError',

  StoppingSupraNode = 'StoppingSupraNode',
  SupraNodeStopped = 'SupraNodeStopped',
  SupraNodeStopError = 'SupraNodeStopError',

  StoppingOllama = 'StoppingOllama',
  OllamaStopped = 'OllamaStopped',
  OllamaStopError = 'OllamaStopError',
}

export interface SupraNodeStartErrorEvent {
  error: string;
}
export interface OllamaStartErrorEvent {
  error: string;
}

export interface PullingModelStartEvent {
  model: string;
}
export interface PullingModelProgressEvent {
  model: string;
  progress: number;
}
export interface PullingModelDoneEvent {
  model: string;
}
export interface PullingModelErrorEvent {
  model: string;
  error: string;
}

export interface SupraNodeStopErrorEvent {
  error: string;
}
export interface OllamaStopErrorEvent {
  error: string;
}

export type SupraNodeManagerEventMap =
  | { type: SupraNodeManagerEvent.StartingSupraNode; payload: never }
  | { type: SupraNodeManagerEvent.SupraNodeStarted; payload: never }
  | {
      type: SupraNodeManagerEvent.SupraNodeStartError;
      payload: SupraNodeStartErrorEvent;
    }
  | { type: SupraNodeManagerEvent.StartingOllama; payload: never }
  | { type: SupraNodeManagerEvent.OllamaStarted; payload: never }
  | {
      type: SupraNodeManagerEvent.OllamaStartError;
      payload: OllamaStartErrorEvent;
    }
  | {
      type: SupraNodeManagerEvent.PullingModelStart;
      payload: PullingModelStartEvent;
    }
  | {
      type: SupraNodeManagerEvent.PullingModelProgress;
      payload: PullingModelProgressEvent;
    }
  | {
      type: SupraNodeManagerEvent.PullingModelDone;
      payload: PullingModelDoneEvent;
    }
  | {
      type: SupraNodeManagerEvent.PullingModelError;
      payload: PullingModelErrorEvent;
    }
  | { type: SupraNodeManagerEvent.StoppingSupraNode; payload: never }
  | { type: SupraNodeManagerEvent.SupraNodeStopped; payload: never }
  | {
      type: SupraNodeManagerEvent.SupraNodeStopError;
      payload: SupraNodeStopErrorEvent;
    }
  | { type: SupraNodeManagerEvent.StoppingOllama; payload: never }
  | { type: SupraNodeManagerEvent.OllamaStopped; payload: never }
  | {
      type: SupraNodeManagerEvent.OllamaStopError;
      payload: OllamaStopErrorEvent;
    };

export type SupraNodeOptions = {
   node_api_ip?: string,
   node_api_port?: string,
   node_ws_port?: string,
   node_ip?: string,
   node_port?: string,
   global_identity_name?: string,
   node_storage_path?: string,
   embeddings_server_url?: string,
   first_device_needs_registration_code?: string,
   initial_agent_names?: string,
   initial_agent_urls?: string,
   initial_agent_models?: string,
   initial_agent_api_keys?: string,
   starting_num_qr_devices?: string,
   log_all?: string,
   proxy_identity?: string,
   rpc_url?: string,
   secret_desktop_installation_proof_key?: string,
};

export type LogEntry = {
  timestamp: number;
  process: string;
  message: string;
};
