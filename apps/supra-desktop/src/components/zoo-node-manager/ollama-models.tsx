import { useTranslation } from '@supraai/supra-i18n';
import {
  Badge,
  Button,
  CardFooter,
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@supraai/supra-ui';

import { cn } from '@supraai/supra-ui/utils';
import { BookOpenText, Database, Sparkles, StarIcon } from 'lucide-react';
import React, { useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import { OLLAMA_MODELS } from '../../lib/supra-node-manager/ollama-models';
import {
  useSupraNodeGetDefaultModel,
  useSupraNodeIsRunningQuery,
  useSupraNodeSpawnMutation,
} from '../../lib/supra-node-manager/supra-node-manager-client';
import ProviderIcon from '../ais/provider-icon';
import { ModelCapabilityTag } from './components/model-capability-tag';
import { ModelQuailityTag } from './components/model-quality-tag';
import { ModelSpeedTag } from './components/model-speed-tag';
import { OllamaModelInstallButton } from './components/ollama-model-install-button';
import { OllamaModelsRepository } from './components/ollama-models-repository';

export const OllamaModels = ({
  rightBottomElement,
  parentShowAllOllamaModels,
  parentSetShowAllOllamaModels,
}: {
  rightBottomElement?: React.ReactNode;
  parentShowAllOllamaModels?: boolean;
  parentSetShowAllOllamaModels?: (value: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { data: defaultModel } = useSupraNodeGetDefaultModel();

  const { data: isSupraNodeRunning } = useSupraNodeIsRunningQuery();
  const { mutateAsync: supraNodeSpawn } = useSupraNodeSpawnMutation({});
  const [internalShowAllOllamaModels, setInternalShowAllOllamaModels] =
    useState(false);

  const showAllOllamaModels =
    parentShowAllOllamaModels ?? internalShowAllOllamaModels;
  const setShowAllOllamaModels =
    parentSetShowAllOllamaModels ?? setInternalShowAllOllamaModels;

  const isDefaultModel = (model: string): boolean => {
    return defaultModel === model;
  };

  if (!isSupraNodeRunning) {
    return (
      <div className="flex h-full w-full flex-row items-center justify-center">
        <div className="text-text-secondary">
          <span
            className={cn('cursor-pointer text-white underline')}
            onClick={() => {
              if (isSupraNodeRunning) {
                return;
              }
              void supraNodeSpawn();
            }}
          >
            Start
          </span>{' '}
          Supra Node to manage your AI models
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-1.5 pb-2',
        showAllOllamaModels && 'h-full',
      )}
    >
      {!showAllOllamaModels && (
        <ScrollArea className="mt-1 flex flex-1 flex-col overflow-auto [&>div>div]:!block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {OLLAMA_MODELS.map((model) => {
              return (
                <Card
                  className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-colors"
                  key={model.fullName}
                >
                  <CardHeader className="relative space-y-3">
                    <div className="flex items-start justify-between">
                      <ProviderIcon
                        className="h-8 w-8 text-zinc-400"
                        provider={model.provider}
                      />
                      {isDefaultModel(model.fullName) && (
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                className="border-zinc-700 bg-zinc-900"
                              >
                                <StarIcon className="h-3 w-3 text-yellow-500" />
                              </Badge>
                            </TooltipTrigger>
                            <TooltipPortal>
                              <TooltipContent align="center" side="top">
                                {t('common.recommended')}
                              </TooltipContent>
                            </TooltipPortal>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold text-zinc-100">
                      {model.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500 line-clamp-2">
                      {model.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {model.capabilities.map((capability) => (
                        <ModelCapabilityTag
                          capability={capability}
                          key={capability}
                        />
                      ))}
                      <ModelQuailityTag quality={model.quality} />
                      <ModelSpeedTag speed={model.speed} />
                      <Badge variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-400">
                        <BookOpenText className="h-3 w-3 mr-1" />
                        <span className="ml-2 overflow-hidden text-ellipsis">
                          {t('supraNode.models.labels.bookPages', {
                            pages: Math.round(
                              (model.contextLength * 0.75) / 380,
                            ),
                          })}
                        </span>
                      </Badge>
                      <Badge variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-400">
                        <Database className="h-3 w-3 mr-1" />
                        <span className="text-ellipsis">{model.size} GB</span>
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <OllamaModelInstallButton model={model.fullName} />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      )}

      {showAllOllamaModels && (
        <div className="h-full w-full">
          <AutoSizer>
            {({ height, width }) => (
              <OllamaModelsRepository style={{ height, width }} />
            )}
          </AutoSizer>
        </div>
      )}
      <span className="text-text-secondary w-full text-right text-xs">
        {t('supraNode.models.poweredByOllama')}
      </span>
      {parentShowAllOllamaModels == null && (
        <div
          className={cn(
            'flex w-full items-center justify-center gap-4 pt-8 pb-4',
            rightBottomElement && 'justify-between',
          )}
        >
          {rightBottomElement && <div className="w-[124px]" />}
          <Button
            className={cn('gap-2 rounded-lg px-6')}
            onClick={() => setShowAllOllamaModels(!showAllOllamaModels)}
            size="sm"
            variant="outline"
          >
            <Sparkles className="h-4 w-4" />
            <span className="capitalize">
              {showAllOllamaModels
                ? t('supraNode.models.labels.showRecommended')
                : t('supraNode.models.labels.showAll')}
            </span>
          </Button>
          {rightBottomElement}
        </div>
      )}
    </div>
  );
};
