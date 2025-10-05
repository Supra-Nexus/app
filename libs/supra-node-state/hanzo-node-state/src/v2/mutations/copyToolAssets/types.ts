import { type Token } from '@supra_network/hanzo-message-ts/api/general/types';
import {
  type CopyToolAssetsRequest,
  type CopyToolAssetsResponse,
} from '@supra_network/hanzo-message-ts/api/tools/types';

export type CopyToolAssetsInput = Token & {
  nodeAddress: string;
  currentToolKeyPath: CopyToolAssetsRequest['first_path'];
  xHanzoAppId: CopyToolAssetsRequest['second_path'];
};

export type CopyToolAssetsOutput = CopyToolAssetsResponse;
