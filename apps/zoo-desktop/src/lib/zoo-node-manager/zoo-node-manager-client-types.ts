export enum ZooNodeManagerEvent {
  StartingZooNode = 'StartingZooNode',
  ZooNodeStarted = 'ZooNodeStarted',
  ZooNodeStartError = 'ZooNodeStartError',

  StartingOllama = 'StartingOllama',
  OllamaStarted = 'OllamaStarted',
  OllamaStartError = 'OllamaStartError',

  PullingModelStart = 'PullingModelStart',
  PullingModelProgress = 'PullingModelProgress',
  PullingModelDone = 'PullingModelDone',
  PullingModelError = 'PullingModelError',

  StoppingZooNode = 'StoppingZooNode',
  ZooNodeStopped = 'ZooNodeStopped',
  ZooNodeStopError = 'ZooNodeStopError',

  StoppingOllama = 'StoppingOllama',
  OllamaStopped = 'OllamaStopped',
  OllamaStopError = 'OllamaStopError',
}

export interface ZooNodeStartErrorEvent {
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

export interface ZooNodeStopErrorEvent {
  error: string;
}
export interface OllamaStopErrorEvent {
  error: string;
}

export type ZooNodeManagerEventMap =
  | { type: ZooNodeManagerEvent.StartingZooNode; payload: never }
  | { type: ZooNodeManagerEvent.ZooNodeStarted; payload: never }
  | {
      type: ZooNodeManagerEvent.ZooNodeStartError;
      payload: ZooNodeStartErrorEvent;
    }
  | { type: ZooNodeManagerEvent.StartingOllama; payload: never }
  | { type: ZooNodeManagerEvent.OllamaStarted; payload: never }
  | {
      type: ZooNodeManagerEvent.OllamaStartError;
      payload: OllamaStartErrorEvent;
    }
  | {
      type: ZooNodeManagerEvent.PullingModelStart;
      payload: PullingModelStartEvent;
    }
  | {
      type: ZooNodeManagerEvent.PullingModelProgress;
      payload: PullingModelProgressEvent;
    }
  | {
      type: ZooNodeManagerEvent.PullingModelDone;
      payload: PullingModelDoneEvent;
    }
  | {
      type: ZooNodeManagerEvent.PullingModelError;
      payload: PullingModelErrorEvent;
    }
  | { type: ZooNodeManagerEvent.StoppingZooNode; payload: never }
  | { type: ZooNodeManagerEvent.ZooNodeStopped; payload: never }
  | {
      type: ZooNodeManagerEvent.ZooNodeStopError;
      payload: ZooNodeStopErrorEvent;
    }
  | { type: ZooNodeManagerEvent.StoppingOllama; payload: never }
  | { type: ZooNodeManagerEvent.OllamaStopped; payload: never }
  | {
      type: ZooNodeManagerEvent.OllamaStopError;
      payload: OllamaStopErrorEvent;
    };

export type ZooNodeOptions = {
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
