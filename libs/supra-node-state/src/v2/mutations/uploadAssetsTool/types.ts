import {
  type CustomToolHeaders,
  type Token,
} from '@supraai/supra-message-ts/api/general/types';

export type UploadAssetsToToolInput = Token &
  CustomToolHeaders & {
    nodeAddress: string;
    files: File[];
  };

export type UploadAssetsToToolOutput = {
  success: boolean;
};
