import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import {
  type GetToolsCategory,
  type GetToolsResponse,
} from '@supra_network/hanzo-message-ts/api/tools/types';

export type GetToolsListInput = Token & {
  nodeAddress: string;
  category?: GetToolsCategory;
};

export type GetToolsListOutput = GetToolsResponse;
