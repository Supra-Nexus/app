import { invoke } from '@tauri-apps/api/core';

export class DebugLogger {
  private static instance: DebugLogger;
  private logs: Array<{ timestamp: string; level: string; message: string; data?: any }> = [];
  private maxLogs = 1000;

  private constructor() {
    // Capture console methods
    this.interceptConsole();
    
    // Capture unhandled errors
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.error('Unhandled error', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error?.stack || event.error?.toString(),
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        this.error('Unhandled promise rejection', {
          reason: event.reason,
          promise: event.promise,
        });
      });
    }
  }

  static getInstance(): DebugLogger {
    if (!DebugLogger.instance) {
      DebugLogger.instance = new DebugLogger();
    }
    return DebugLogger.instance;
  }

  private interceptConsole() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    console.log = (...args: any[]) => {
      this.log('log', ...args);
      originalLog.apply(console, args);
    };

    console.error = (...args: any[]) => {
      this.error('console.error', ...args);
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      this.warn('console.warn', ...args);
      originalWarn.apply(console, args);
    };

    console.info = (...args: any[]) => {
      this.info('console.info', ...args);
      originalInfo.apply(console, args);
    };
  }

  private addLog(level: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message, data };
    
    this.logs.push(logEntry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Also write to Tauri backend
    this.writeToBackend(logEntry).catch(console.error);
  }

  private async writeToBackend(logEntry: any) {
    try {
      await invoke('write_debug_log', { log: JSON.stringify(logEntry) });
    } catch (e) {
      // Silently fail if backend logging is not available
    }
  }

  log(message: string, ...data: any[]) {
    this.addLog('info', message, data);
  }

  info(message: string, ...data: any[]) {
    this.addLog('info', message, data);
  }

  warn(message: string, ...data: any[]) {
    this.addLog('warn', message, data);
  }

  error(message: string, ...data: any[]) {
    this.addLog('error', message, data);
  }

  debug(message: string, ...data: any[]) {
    this.addLog('debug', message, data);
  }

  getLogs() {
    return [...this.logs];
  }

  getErrorLogs() {
    return this.logs.filter(log => log.level === 'error');
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  async saveLogs() {
    try {
      const logs = this.exportLogs();
      await invoke('save_debug_logs', { logs });
      return true;
    } catch (e) {
      console.error('Failed to save logs:', e);
      return false;
    }
  }
}

// Initialize logger immediately
export const logger = DebugLogger.getInstance();