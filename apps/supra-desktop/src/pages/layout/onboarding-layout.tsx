import { cn } from '@supraai/supra-ui/utils';
import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router';
import { supraLogoDataUrl } from '@supraai/logo';

import { UpdateBanner } from '../../components/hardware-capabilities/update-banner';
import { LogoTapContext } from '../terms-conditions';

export type OnboardingLayoutProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

const OnboardingLayout = ({ className, ...props }: OnboardingLayoutProps) => {
  const { tapCount, setTapCount, setShowLocalNodeOption } =
    useContext(LogoTapContext);
  const location = useLocation();
  const isModelDownloadPage = location.pathname.includes('model-download');

  const handleLogoTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5) {
      setShowLocalNodeOption(true);
      setTapCount(0);
    }
  };

  // For model download page, use full screen layout
  if (isModelDownloadPage) {
    return (
      <div className={cn('bg-bg-dark relative h-full', className)} {...props}>
        <UpdateBanner />
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    );
  }

  // For other onboarding pages, keep the centered layout with logo
  return (
    <div
      className={cn(
        'bg-bg-dark relative mx-auto flex h-full items-center justify-center px-[48px]',
        className,
      )}
      {...props}
    >
      <UpdateBanner />
      <div className="flex h-[calc(100dvh-100px)] items-center justify-center w-full">
        <div className="mx-auto flex h-[600px] w-full max-w-lg flex-col gap-12">
          <img
            alt="supra logo"
            className="w-24 cursor-pointer"
            data-cy="supra-logo"
            onClick={handleLogoTap}
            src={supraLogoDataUrl}
          />

          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
