import { type Token } from '@zooai/zoo-message-ts/api/general/types';
import {
  type CopyToolAssetsRequest,
  type CopyToolAssetsResponse,
} from '@zooai/zoo-message-ts/api/tools/types';

export type CopyToolAssetsInput = Token & {
  nodeAddress: string;
  currentToolKeyPath: CopyToolAssetsRequest['first_path'];
  xZooAppId: CopyToolAssetsRequest['second_path'];
};

export type CopyToolAssetsOutput = CopyToolAssetsResponse;
