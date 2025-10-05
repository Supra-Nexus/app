import {
  type CustomToolHeaders,
  type Token,
} from '@supraai/supra-message-ts/api/general/types';

export type RemoveAssetToToolInput = Token &
  CustomToolHeaders & {
    nodeAddress: string;
    filename: string;
  };

export type RemoveAssetToToolOutput = {
  success: boolean;
};
