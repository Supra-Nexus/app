import { type Token } from "@supraai/supra-message-ts/api/general/types";
import { type DuplicateToolResponse } from "@supraai/supra-message-ts/api/tools/types";

export type DuplicateToolInput = Token & {
  nodeAddress: string;
  toolKey: string;
};

export type DuplicateToolOutput = DuplicateToolResponse;
