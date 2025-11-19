import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Create an MSW worker with our handlers
export const worker = setupWorker(...handlers);

if (import.meta.env.DEV) {
  // IMPORTANT: set onUnhandledRequest to 'bypass' so non-API requests (pages, static assets, routing) are ignored
  worker.start({
    onUnhandledRequest: 'bypass', // 'warn' | 'bypass' | 'error'
  });
}
