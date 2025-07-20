import { LogBox } from 'react-native';
import { sendLogsToBackend } from "@/src/services/sendLogs.js"

// Suppress warning boxes
LogBox.ignoreAllLogs();

// Backup original console methods
const originalConsole = { ...console };

// Store logs
const logBuffer = [];

function logHandler(type, ...args) {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] [${type}] ${args.join(' ')}`;

  logBuffer.push({ type, message });

  sendLogsToBackend(logBuffer).then(() => {
    logBuffer.length = 0;
  });

  originalConsole[type](...args);
}

// Override console methods
['log', 'warn', 'error', 'info', 'debug'].forEach((method) => {
  console[method] = (...args) => logHandler(method, ...args);
});

// Global JS error handler
if (global.ErrorUtils) {
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] [globalError] ${error?.message || 'Unknown error'}`;

    logBuffer.push({
      type: 'globalError',
      message,
    });

    originalConsole.error('Global JS Error:', error, { isFatal });

    // Send logs
    sendLogsToBackend(logBuffer).then(() => {
      logBuffer.length = 0;
    });
  });
}