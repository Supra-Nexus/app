import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type GetToolsCategory,
  type GetToolsResponse,
} from '@zooai/zoo-message-ts/api/tools/types';

export type GetToolsListInput = Token & {
  nodeAddress: string;
  category?: GetToolsCategory;
};

export type GetToolsListOutput = GetToolsResponse;
