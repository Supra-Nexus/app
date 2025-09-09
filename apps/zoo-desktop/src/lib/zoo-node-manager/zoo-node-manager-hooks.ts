import { type Event, type EventCallback, listen } from '@tauri-apps/api/event';
import { warn } from '@tauri-apps/plugin-log';
import { useEffect, useState } from 'react';

import {
  ZooNodeManagerEvent,
  type ZooNodeManagerEventMap,
} from './zoo-node-manager-client-types';
import {
  // ollamaStartedToast,
  ollamaStartErrorToast,
  ollamaStopErrorToast,
  ollamaStoppedToast,
  // pullingModelDoneToast,
  pullingModelErrorToast,
  zooNodeStartedToast,
  // pullingModelProgressToast,
  // pullingModelStartToast,
  // zooNodeStartedToast,
  zooNodeStartErrorToast,
  zooNodeStopErrorToast,
  zooNodeStoppedToast,
  // startingOllamaToast,
  // startingZooNodeToast,
  stoppingOllamaToast,
  stoppingZooNodeToast,
} from './zoo-node-manager-toasts-utils';

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

export const useZooNodeStateChange = (
  callback: EventCallback<ZooNodeManagerEventMap>,
) => {
  return useTauriEvent<ZooNodeManagerEventMap>(
    'zoo-node-state-change',
    callback,
  );
};

export const mapEvent = (
  event: object | string,
): ZooNodeManagerEventMap => {
  if (typeof event === 'object') {
    return {
      type: Object.keys(event)[0] as ZooNodeManagerEvent,
      payload: Object.values(event)[0],
    } as any;
  } else {
    return { type: event as ZooNodeManagerEvent } as any;
  }
};

export const useZooNodeEventsToast = () => {
  const [zooNodeEventState, setZooNodeEventState] = useState({
    type: '' as ZooNodeManagerEvent,
    payload: {} as any,
  });
  useZooNodeStateChange((event) => {
    const zooNodeEvent = mapEvent(event.payload);
    setZooNodeEventState(zooNodeEvent);
    switch (zooNodeEvent.type) {
      // case ZooNodeManagerEvent.StartingZooNode:
      //   startingZooNodeToast();
      //   break;
      case ZooNodeManagerEvent.ZooNodeStarted:
        zooNodeStartedToast();
        break;
      case ZooNodeManagerEvent.ZooNodeStartError:
        zooNodeStartErrorToast();
        break;

      case ZooNodeManagerEvent.StoppingZooNode:
        stoppingZooNodeToast();
        break;
      case ZooNodeManagerEvent.ZooNodeStopped:
        zooNodeStoppedToast();
        break;
      case ZooNodeManagerEvent.ZooNodeStopError:
        zooNodeStopErrorToast();
        break;

      // case ZooNodeManagerEvent.StartingOllama:
      //   startingOllamaToast();
      //   break;
      // case ZooNodeManagerEvent.OllamaStarted:
      //   ollamaStartedToast();
      //   break;
      case ZooNodeManagerEvent.OllamaStartError:
        ollamaStartErrorToast();
        break;

      case ZooNodeManagerEvent.StoppingOllama:
        stoppingOllamaToast();
        break;
      case ZooNodeManagerEvent.OllamaStopped:
        ollamaStoppedToast();
        break;
      case ZooNodeManagerEvent.OllamaStopError:
        ollamaStopErrorToast();
        break;

      // case ZooNodeManagerEvent.PullingModelStart:
      //   pullingModelStartToast(zooNodeEvent.payload.model);
      //   break;
      // case ZooNodeManagerEvent.PullingModelProgress:
      //   pullingModelProgressToast(
      //     zooNodeEvent.payload.model,
      //     zooNodeEvent.payload.progress,
      //   );
      //   break;
      // case ZooNodeManagerEvent.PullingModelDone:
      //   pullingModelDoneToast(zooNodeEvent.payload.model);
      //   break;
      case ZooNodeManagerEvent.PullingModelError:
        pullingModelErrorToast(zooNodeEvent.payload.model);
        break;
      default:
        void warn(
          `unhandled zoo node state change:${zooNodeEvent.type}`,
        );
    }
  });
  return zooNodeEventState;
};
