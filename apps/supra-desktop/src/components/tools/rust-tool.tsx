import { type RustSupraTool } from '@supraai/supra-message-ts/api/tools/types';

import ToolDetailsCard from './components/tool-details-card';

export default function RustTool({
  tool,
  isEnabled,
  toolRouterKey,
}: {
  tool: RustSupraTool;
  isEnabled: boolean;
  toolRouterKey: string;
}) {
  return (
    <ToolDetailsCard
      isEnabled={isEnabled}
      tool={tool}
      toolKey={toolRouterKey}
      toolType="Rust"
    />
  );
}
