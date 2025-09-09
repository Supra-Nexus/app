import { type Token } from '@zooai/zoo-message-ts/api/general/types';

import { type Attachment } from '../getChatConversation/types';

export type GetZooFileProtocolInput = Token & {
  nodeAddress: string;
  file: string;
};

export type GetZooFileProtocolOutput = Blob;

export type GetZooFilesProtocolInput = Token & {
  nodeAddress: string;
  files: string[];
};

export type GetZooFilesProtocolOutput = Attachment[];
