import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatbotProvider } from "@/context/ChatbotContext";
import Home from "@/pages/Home";
import UsedEngine from "@/pages/UsedEngine";
import ProductListing from "@/pages/ProductListing";
import NotFound from "@/pages/not-found";
import Chatbot from "@/components/Chatbot";
import CallWidget from "@/components/CallWidget";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/used-engine" component={UsedEngine} />
      <Route path="/products" component={ProductListing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatbotProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <Chatbot />
          <CallWidget />
        </TooltipProvider>
      </ChatbotProvider>
    </QueryClientProvider>
  );
}

export default App;
