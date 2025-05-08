import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

// Add Remix icon CSS for icons
const remixIconLink = document.createElement("link");
remixIconLink.href = "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css";
remixIconLink.rel = "stylesheet";
document.head.appendChild(remixIconLink);

// Add title and meta description for SEO
const titleElement = document.createElement("title");
titleElement.textContent = "3D Printing Academy - Learn 3D Printing Concepts";
document.head.appendChild(titleElement);

const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Comprehensive interactive learning application that teaches 3D printing concepts through visual demonstrations, tutorials, and quizzes";
document.head.appendChild(metaDescription);

// Open Graph tags for better social media sharing
const ogTitle = document.createElement("meta");
ogTitle.property = "og:title";
ogTitle.content = "3D Printing Academy - Learn 3D Printing Concepts";
document.head.appendChild(ogTitle);

const ogDescription = document.createElement("meta");
ogDescription.property = "og:description";
ogDescription.content = "Master 3D printing with interactive lessons, visual guides, and hands-on tutorials. Perfect for beginners and intermediate makers.";
document.head.appendChild(ogDescription);

const ogType = document.createElement("meta");
ogType.property = "og:type";
ogType.content = "website";
document.head.appendChild(ogType);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <App />
      <Toaster />
    </TooltipProvider>
  </QueryClientProvider>
);
