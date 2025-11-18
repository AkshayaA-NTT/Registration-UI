import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Create an MSW worker with our handlers
export const worker = setupWorker(...handlers);
