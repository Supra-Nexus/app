import { type NetworkSupraTool } from '@supraai/supra-message-ts/api/tools/types';

import ToolDetailsCard from './components/tool-details-card';

export default function NetworkTool({
  tool,
  isEnabled,
  toolRouterKey,
}: {
  tool: NetworkSupraTool;
  isEnabled: boolean;
  toolRouterKey: string;
}) {
  return (
    <ToolDetailsCard
      isEnabled={isEnabled}
      tool={tool}
      toolKey={toolRouterKey}
      toolType="Network"
    />
  );
}
