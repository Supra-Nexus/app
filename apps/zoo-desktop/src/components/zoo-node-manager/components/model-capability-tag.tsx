import { useTranslation } from '@zooai/zoo-i18n';
import { Badge } from '@zooai/zoo-ui';
import { cn } from '@zooai/zoo-ui/utils';
import { ALargeSmall, Brain, Images, Wrench } from 'lucide-react';
import { type ReactNode } from 'react';

import { OllamaModelCapability } from '../../../lib/zoo-node-manager/ollama-models';

export const ModelCapabilityTag = ({
  className,
  capability,
  ...props
}: {
  capability: OllamaModelCapability;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation();

  const capabilityMap: {
    [key in OllamaModelCapability]: { text: string; icon: ReactNode };
  } = {
    [OllamaModelCapability.ImageToText]: {
      icon: <Images className="h-3.5 w-3.5" />,
      text: t('zooNode.models.labels.visionCapability'),
    },
    [OllamaModelCapability.TextGeneration]: {
      icon: <ALargeSmall className="h-3.5 w-3.5" />,
      text: t('zooNode.models.labels.textCapability'),
    },
    [OllamaModelCapability.Thinking]: {
      icon: <Brain className="h-3.5 w-3.5" />,
      text: t('zooNode.models.labels.thinkingCapability'),
    },
    [OllamaModelCapability.ToolCalling]: {
      icon: <Wrench className="h-3.5 w-3.5" />,
      text: t('zooNode.models.labels.toolCallingCapability'),
    },
  };
  return (
    <Badge className={cn(className)} variant="tags" {...props}>
      {capabilityMap[capability].icon}
      <span className="ml-2">{capabilityMap[capability].text}</span>
    </Badge>
  );
};
