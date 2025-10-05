import './globals.css';

import { I18nProvider } from '@supraai/supra-i18n';
import { QueryProvider } from '@supraai/supra-node-state';
import { Toaster, TooltipProvider } from '@supraai/supra-ui';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router';

import { ChatProvider } from '../../components/chat/context/chat-context';
import { ToolsProvider } from '../../components/chat/context/tools-context';
import FullPageErrorFallback from '../../components/error-boundary';
import { supraNodeQueryClient } from '../../lib/supra-node-manager/supra-node-manager-client';
import { useSupraNodeEventsToast } from '../../lib/supra-node-manager/supra-node-manager-hooks';
import { SupraNodeRunningOverlay } from '../../lib/supra-node-overlay';
import { useSyncStorageSecondary } from '../../store/sync-utils';
import QuickAsk from './components/quick-ask';
import { QuickAskProvider } from './context/quick-ask';

const App = () => {
  useSyncStorageSecondary();
  useSupraNodeEventsToast();

  return (
    <I18nProvider>
      <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
        <QuickAskProvider>
          <ToolsProvider>
            <SupraNodeRunningOverlay>
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
            </SupraNodeRunningOverlay>
          </ToolsProvider>
        </QuickAskProvider>
      </ErrorBoundary>
    </I18nProvider>
  );
};

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={supraNodeQueryClient}>
      <QueryProvider>
        <App />
      </QueryProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
