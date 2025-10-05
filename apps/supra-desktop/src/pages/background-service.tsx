import { useTranslation } from '@supraai/supra-i18n';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Switch,
  Label,
  Alert,
  AlertDescription,
  Button,
} from '@supraai/supra-ui';
import { useState, useEffect } from 'react';
import { Info, Power, Shield, Zap } from 'lucide-react';

// Dynamic import with fallback
const getAutostart = async () => {
  try {
    return await import('@tauri-apps/plugin-autostart');
  } catch {
    // Fallback to stub when plugin is not available (e.g., in CI)
    return await import('../lib/autostart-stub');
  }
};

export default function BackgroundServicePage() {
  const { t } = useTranslation();
  const [isAutoStartEnabled, setIsAutoStartEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAutoStartStatus();
  }, []);

  const checkAutoStartStatus = async () => {
    try {
      const autostart = await getAutostart();
      const enabled = await autostart.isEnabled();
      setIsAutoStartEnabled(enabled);
    } catch (error) {
      console.error('Failed to check autostart status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAutoStart = async () => {
    setIsLoading(true);
    try {
      const autostart = await getAutostart();
      if (isAutoStartEnabled) {
        await autostart.disable();
        setIsAutoStartEnabled(false);
      } else {
        await autostart.enable();
        setIsAutoStartEnabled(true);
      }
    } catch (error) {
      console.error('Failed to toggle autostart:', error);
      // Revert the state if the operation failed
      await checkAutoStartStatus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('Background Service')}</h1>
        <p className="text-muted-foreground">
          {t('Configure Supra Node to run in the background')}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Power className="h-5 w-5" />
              {t('Auto-Start on Login')}
            </CardTitle>
            <CardDescription>
              {t('Automatically start Supra Node when you log in to your computer')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="autostart" className="flex-1">
                {t('Enable auto-start')}
              </Label>
              <Switch
                id="autostart"
                checked={isAutoStartEnabled}
                onCheckedChange={handleToggleAutoStart}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            {t(
              'When enabled, Supra Node will start minimized in your system tray and be ready whenever you need it.'
            )}
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              {t('Performance')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">{t('Resource Usage')}</h4>
              <p className="text-sm text-muted-foreground">
                {t(
                  'Running in the background uses minimal system resources when idle. The node only becomes active when processing AI requests.'
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t('Privacy & Security')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">{t('Local Processing')}</h4>
              <p className="text-sm text-muted-foreground">
                {t(
                  'All AI processing happens locally on your device. No data is sent to external servers when using local models.'
                )}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">{t('Network Access')}</h4>
              <p className="text-sm text-muted-foreground">
                {t(
                  'The background service only listens on localhost (127.0.0.1) and is not accessible from other devices on your network.'
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}