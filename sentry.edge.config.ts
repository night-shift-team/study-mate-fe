import * as Sentry from '@sentry/nextjs';
Sentry.init({
  dsn: 'https://d7a1c5e3d04699bebc936fc77675e64d@o4510257049567232.ingest.us.sentry.io/4510257050288128',
  // We recommend adjusting this value in production, or using `tracesSampler`
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
  ],
  enableLogs: true,
  // for finer control
  tracesSampleRate: 1.0,
  // ... rest of your config
});
