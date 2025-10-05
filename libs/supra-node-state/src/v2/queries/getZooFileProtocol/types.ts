import { type Token } from '@supraai/supra-message-ts/api/general/types';

import { type Attachment } from '../getChatConversation/types';

export type GetSupraFileProtocolInput = Token & {
  nodeAddress: string;
  file: string;
};

export type GetSupraFileProtocolOutput = Blob;

export type GetSupraFilesProtocolInput = Token & {
  nodeAddress: string;
  files: string[];
};

export type GetSupraFilesProtocolOutput = Attachment[];
