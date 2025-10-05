import { type Token } from "@supra_network/hanzo-message-ts/api/general/types";
import { type DuplicateToolResponse } from "@supra_network/hanzo-message-ts/api/tools/types";

export type DuplicateToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};

export type DuplicateToolOutput = DuplicateToolResponse;
