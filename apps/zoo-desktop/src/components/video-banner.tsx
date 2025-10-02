import { useTranslation } from '@zooai/zoo-i18n';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@zooai/zoo-ui';
import { cn } from '@zooai/zoo-ui/utils';
import React from 'react';
import { zooLogoDataUrl } from '@zooai/logo';

interface VideoBannerProps {
  onClose?: () => void;
  title: string;
  videoUrl: string;
  duration: string;
}
export const ZOO_DOCS_URL = 'https://docs.zoo.ngo';

export function VideoBanner({ title, videoUrl, duration }: VideoBannerProps) {
  const [isVideoDialogOpen, setIsVideoDialogOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div
        className={cn(
          'animate-scale-in group relative cursor-pointer overflow-hidden rounded-2xl border border-green-500/20',
          'bg-gradient-to-br from-green-950/20 to-black w-full flex-shrink-0 p-2.5 transition-all hover:border-green-500/40',
        )}
        onClick={() => setIsVideoDialogOpen(true)}
      >
        <div className="aspect-video w-full overflow-hidden relative">
          <img
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={'./zoo-app-screenshot.png'}
          />
          {/* Zoo logo overlay */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-green-500/10 backdrop-blur-sm rounded-lg p-2 border border-green-500/20">
            <img
              alt="Zoo Logo"
              className="w-full h-full object-contain"
              src={zooLogoDataUrl}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/5 transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute right-0 bottom-0 left-0 p-5 pt-10">
          <h3 className="mb-1 truncate text-left text-base font-medium text-white">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="inline-flex rounded-full border border-green-500/30 bg-green-500/20 px-2.5 py-1">
              <span className="text-xs font-medium text-green-300">
                {duration}
              </span>
            </span>
          </div>
        </div>
      </div>

      <Dialog onOpenChange={setIsVideoDialogOpen} open={isVideoDialogOpen}>
        <DialogContent className="sm:max-w-[85vw]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <video className="h-full w-full" controls src={videoUrl}>
              {t('videoBanner.unsupported')}
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
