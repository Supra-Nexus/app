import { Badge } from '@zooai/zoo-ui';

import { OllamaModelSpeed } from '../../../lib/zoo-node-manager/ollama-models';

export const ModelSpeedTag = ({ speed }: { speed: OllamaModelSpeed }) => {
  const emojiMap: { [key in OllamaModelSpeed]: string } = {
    [OllamaModelSpeed.Average]: '🐕',
    [OllamaModelSpeed.Fast]: '🐎',
    [OllamaModelSpeed.VeryFast]: '🐆',
  };

  return (
    <Badge variant="tags">
      <span>{emojiMap[speed]}</span>
      <span className="ml-2">{speed}</span>
    </Badge>
  );
};
