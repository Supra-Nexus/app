import { type Token } from '@supraai/supra-message-ts/api/general/types';
import {
  type CopyToolAssetsRequest,
  type CopyToolAssetsResponse,
} from '@supraai/supra-message-ts/api/tools/types';

export type CopyToolAssetsInput = Token & {
  nodeAddress: string;
  currentToolKeyPath: CopyToolAssetsRequest['first_path'];
  xSupraAppId: CopyToolAssetsRequest['second_path'];
};

export type CopyToolAssetsOutput = CopyToolAssetsResponse;
