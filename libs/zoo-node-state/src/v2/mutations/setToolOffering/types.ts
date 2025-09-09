import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type ToolOffering,
  type SetToolOfferingResponse,
} from '@zooai/zoo-message-ts/api/tools/types';

export type SetToolOfferingOutput = SetToolOfferingResponse;

export type SetToolOfferingInput = Token & {
  nodeAddress: string;
  offering: ToolOffering;
};
