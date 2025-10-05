import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type ToolOffering,
  type SetToolOfferingResponse,
} from '@supraai/supra-message-ts/api/tools/types';

export type SetToolOfferingOutput = SetToolOfferingResponse;

export type SetToolOfferingInput = Token & {
  nodeAddress: string;
  offering: ToolOffering;
};
