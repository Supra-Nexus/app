import { type Event, type EventCallback, listen } from '@tauri-apps/api/event';
import { warn } from '@tauri-apps/plugin-log';
import { useEffect, useState } from 'react';

import {
  SupraNodeManagerEvent,
  type SupraNodeManagerEventMap,
} from './supra-node-manager-client-types';
import {
  // ollamaStartedToast,
  ollamaStartErrorToast,
  ollamaStopErrorToast,
  ollamaStoppedToast,
  // pullingModelDoneToast,
  pullingModelErrorToast,
  supraNodeStartedToast,
  // pullingModelProgressToast,
  // pullingModelStartToast,
  // supraNodeStartedToast,
  supraNodeStartErrorToast,
  supraNodeStopErrorToast,
  supraNodeStoppedToast,
  // startingOllamaToast,
  // startingSupraNodeToast,
  stoppingOllamaToast,
  stoppingSupraNodeToast,
} from './supra-node-manager-toasts-utils';

/**
 * Custom React hook to subscribe to Tauri events.
 * @param eventName The name of the event to subscribe to.
 * @param callback The callback function to execute when the event is received.
 */
const useTauriEvent = <T>(eventName: string, callback: EventCallback<T>) => {
  useEffect(() => {
    // Subscribe to the Tauri event
    const unsubscribe = listen(eventName, (event: Event<T>) => {
      callback(event);
    });

    // Cleanup subscription on component unmount
    return () => {
      void unsubscribe.then((unsub) => unsub());
    };
  }, [eventName, callback]);
};

export const useSupraNodeStateChange = (
  callback: EventCallback<SupraNodeManagerEventMap>,
) => {
  return useTauriEvent<SupraNodeManagerEventMap>(
    'supra-node-state-change',
    callback,
  );
};

export const mapEvent = (
  event: object | string,
): SupraNodeManagerEventMap => {
  if (typeof event === 'object') {
    return {
      type: Object.keys(event)[0] as SupraNodeManagerEvent,
      payload: Object.values(event)[0],
    } as any;
  } else {
    return { type: event as SupraNodeManagerEvent } as any;
  }
};

export const useSupraNodeEventsToast = () => {
  const [supraNodeEventState, setSupraNodeEventState] = useState({
    type: '' as SupraNodeManagerEvent,
    payload: {} as any,
  });
  useSupraNodeStateChange((event) => {
    const supraNodeEvent = mapEvent(event.payload);
    setSupraNodeEventState(supraNodeEvent);
    switch (supraNodeEvent.type) {
      // case SupraNodeManagerEvent.StartingSupraNode:
      //   startingSupraNodeToast();
      //   break;
      case SupraNodeManagerEvent.SupraNodeStarted:
        supraNodeStartedToast();
        break;
      case SupraNodeManagerEvent.SupraNodeStartError:
        supraNodeStartErrorToast();
        break;

      case SupraNodeManagerEvent.StoppingSupraNode:
        stoppingSupraNodeToast();
        break;
      case SupraNodeManagerEvent.SupraNodeStopped:
        supraNodeStoppedToast();
        break;
      case SupraNodeManagerEvent.SupraNodeStopError:
        supraNodeStopErrorToast();
        break;

      // case SupraNodeManagerEvent.StartingOllama:
      //   startingOllamaToast();
      //   break;
      // case SupraNodeManagerEvent.OllamaStarted:
      //   ollamaStartedToast();
      //   break;
      case SupraNodeManagerEvent.OllamaStartError:
        ollamaStartErrorToast();
        break;

      case SupraNodeManagerEvent.StoppingOllama:
        stoppingOllamaToast();
        break;
      case SupraNodeManagerEvent.OllamaStopped:
        ollamaStoppedToast();
        break;
      case SupraNodeManagerEvent.OllamaStopError:
        ollamaStopErrorToast();
        break;

      // case SupraNodeManagerEvent.PullingModelStart:
      //   pullingModelStartToast(supraNodeEvent.payload.model);
      //   break;
      // case SupraNodeManagerEvent.PullingModelProgress:
      //   pullingModelProgressToast(
      //     supraNodeEvent.payload.model,
      //     supraNodeEvent.payload.progress,
      //   );
      //   break;
      // case SupraNodeManagerEvent.PullingModelDone:
      //   pullingModelDoneToast(supraNodeEvent.payload.model);
      //   break;
      case SupraNodeManagerEvent.PullingModelError:
        pullingModelErrorToast(supraNodeEvent.payload.model);
        break;
      default:
        void warn(
          `unhandled supra node state change:${supraNodeEvent.type}`,
        );
    }
  });
  return supraNodeEventState;
};
