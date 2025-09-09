import { type Token } from "@zooai/zoo-message-ts/api/general/types";
import { type DuplicateToolResponse } from "@zooai/zoo-message-ts/api/tools/types";

export type DuplicateToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};

export type DuplicateToolOutput = DuplicateToolResponse;
