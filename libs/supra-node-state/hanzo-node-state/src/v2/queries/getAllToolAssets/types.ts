import {
  type CustomToolHeaders,
  type Token,
} from '@supra_network/hanzo-message-ts/api/general/types';
import { type GetAllToolAssetsResponse } from '@supra_network/hanzo-message-ts/api/tools/types';

export type GetAllToolAssetsInput = Token &
  CustomToolHeaders & {
    nodeAddress: string;
  };

export type GetAllToolAssetsOutput = GetAllToolAssetsResponse;
