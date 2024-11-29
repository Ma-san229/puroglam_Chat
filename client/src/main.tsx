import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ChatProvider } from "./context/ChatContext";
import { ChatView } from "./views/ChatView";
import logger from "./utils/logger";

logger.info('Initializing application');

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChatProvider>
        <ChatView />
        <Toaster />
      </ChatProvider>
    </QueryClientProvider>
  </StrictMode>,
);
