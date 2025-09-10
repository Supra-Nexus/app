import { useTranslation } from '@zooai/zoo-i18n';
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
} from '@zooai/zoo-ui';
import { isEnabled, enable, disable } from '@tauri-apps/plugin-autostart';
import { useState, useEffect } from 'react';
import { Info, Power, Shield, Zap } from 'lucide-react';

export default function BackgroundServicePage() {
  const { t } = useTranslation();
  const [isAutoStartEnabled, setIsAutoStartEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAutoStartStatus();
  }, []);

  const checkAutoStartStatus = async () => {
    try {
      const enabled = await isEnabled();
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
      if (isAutoStartEnabled) {
        await disable();
        setIsAutoStartEnabled(false);
      } else {
        await enable();
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
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Background Service</h1>
        <p className="text-text-secondary mt-1">
          Configure Zoo Node to run in the background
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5" />
            Launch at Login
          </CardTitle>
          <CardDescription>
            Start Zoo Node automatically when you log in to your computer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="autostart" className="flex flex-col gap-1">
              <span className="text-base font-medium">Enable autostart</span>
              <span className="text-sm text-text-secondary">
                Zoo Node will start in the background when you log in
              </span>
            </Label>
            <Switch
              id="autostart"
              checked={isAutoStartEnabled}
              onCheckedChange={handleToggleAutoStart}
              disabled={isLoading}
            />
          </div>

          {isAutoStartEnabled && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Zoo Node is configured to start automatically at login. It will run in the
                background and be accessible from the menu bar.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Background Mode Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <Zap className="h-5 w-5 text-cyan-500 mt-0.5" />
            <div>
              <p className="font-medium">Always Ready</p>
              <p className="text-sm text-text-secondary">
                Your AI models are instantly available without waiting for startup
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-cyan-500 mt-0.5" />
            <div>
              <p className="font-medium">Privacy First</p>
              <p className="text-sm text-text-secondary">
                All processing happens locally on your device, no internet required
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Power className="h-5 w-5 text-cyan-500 mt-0.5" />
            <div>
              <p className="font-medium">Menu Bar Access</p>
              <p className="text-sm text-text-secondary">
                Quick access to Zoo AI from your menu bar without opening the full app
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resource Usage</CardTitle>
          <CardDescription>
            Running in the background uses minimal resources when idle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• Memory usage: ~200MB when idle</li>
            <li>• CPU usage: &lt;1% when not processing</li>
            <li>• Models are loaded on-demand when needed</li>
            <li>• No impact on battery life when idle</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}