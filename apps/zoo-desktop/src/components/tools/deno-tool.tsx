import { type DenoZooTool } from '@zooai/zoo-message-ts/api/tools/types';

import ToolDetailsCard from './components/tool-details-card';

export default function DenoTool({
  tool,
  isEnabled,
  isPlaygroundTool,
  toolRouterKey,
}: {
  tool: DenoZooTool;
  isEnabled: boolean;
  isPlaygroundTool?: boolean;
  toolRouterKey: string;
}) {
  return (
    <ToolDetailsCard
      isEnabled={isEnabled}
      isPlaygroundTool={isPlaygroundTool}
      tool={tool}
      toolKey={toolRouterKey}
      toolType="Deno"
    />
  );
}
