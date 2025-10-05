import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type GetToolsCategory,
  type GetToolsResponse,
} from '@supraai/supra-message-ts/api/tools/types';

export type GetToolsListInput = Token & {
  nodeAddress: string;
  category?: GetToolsCategory;
};

export type GetToolsListOutput = GetToolsResponse;
