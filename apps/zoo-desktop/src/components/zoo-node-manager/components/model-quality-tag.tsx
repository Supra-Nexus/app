import { t } from '@zooai/zoo-i18n';
import { Badge } from '@zooai/zoo-ui';
import { cn } from '@zooai/zoo-ui/utils';
import { Sparkles } from 'lucide-react';

import { type OllamaModelQuality } from '../../../lib/zoo-node-manager/ollama-models';

export const ModelQuailityTag = ({
  className,
  quality,
  ...props
}: {
  quality: OllamaModelQuality;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Badge className={cn(className)} variant="tags" {...props}>
      <Sparkles className="h-4 w-4" />
      <span className="ml-2">
        {quality} {t('zooNode.models.labels.quality')}
      </span>
    </Badge>
  );
};
