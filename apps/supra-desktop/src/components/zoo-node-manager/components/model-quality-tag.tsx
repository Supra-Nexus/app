import { t } from '@supraai/supra-i18n';
import { Badge } from '@supraai/supra-ui';
import { cn } from '@supraai/supra-ui/utils';
import { Sparkles } from 'lucide-react';

import { type OllamaModelQuality } from '../../../lib/supra-node-manager/ollama-models';

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
        {quality} {t('supraNode.models.labels.quality')}
      </span>
    </Badge>
  );
};
