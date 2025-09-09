import './globals.css';

import { I18nProvider } from '@zooai/zoo-i18n';
import { QueryProvider } from '@zooai/zoo-node-state';
import { Toaster, TooltipProvider } from '@zooai/zoo-ui';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router';

import { ChatProvider } from '../../components/chat/context/chat-context';
import { ToolsProvider } from '../../components/chat/context/tools-context';
import FullPageErrorFallback from '../../components/error-boundary';
import { zooNodeQueryClient } from '../../lib/zoo-node-manager/zoo-node-manager-client';
import { useZooNodeEventsToast } from '../../lib/zoo-node-manager/zoo-node-manager-hooks';
import { ZooNodeRunningOverlay } from '../../lib/zoo-node-overlay';
import { useSyncStorageSecondary } from '../../store/sync-utils';
import QuickAsk from './components/quick-ask';
import { QuickAskProvider } from './context/quick-ask';

const App = () => {
  useSyncStorageSecondary();
  useZooNodeEventsToast();

  return (
    <I18nProvider>
      <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
        <QuickAskProvider>
          <ToolsProvider>
            <ZooNodeRunningOverlay>
              <ChatProvider>
                <TooltipProvider delayDuration={0}>
                  <Router>
                    {/*<Routes>*/}
                    <QuickAsk />
                    {/*</Routes>*/}
                  </Router>
                  <Toaster />
                </TooltipProvider>
              </ChatProvider>
            </ZooNodeRunningOverlay>
          </ToolsProvider>
        </QuickAskProvider>
      </ErrorBoundary>
    </I18nProvider>
  );
};

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={zooNodeQueryClient}>
      <QueryProvider>
        <App />
      </QueryProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
