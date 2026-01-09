import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Only import Index directly, lazy load the rest
import Index from "./pages/Index";

const queryClient = new QueryClient();

// Lazy load other pages to avoid import chain crashes
const TelcOverview = lazy(() => import("./pages/TelcOverview"));
const TelcB1 = lazy(() => import("./pages/TelcB1"));
const TelcB2 = lazy(() => import("./pages/TelcB2"));
const TelcC1 = lazy(() => import("./pages/TelcC1"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseA1 = lazy(() => import("./pages/CourseA1"));
const CourseA2 = lazy(() => import("./pages/CourseA2"));
const CourseB1 = lazy(() => import("./pages/CourseB1"));
const CourseB2 = lazy(() => import("./pages/CourseB2"));
const CourseC1 = lazy(() => import("./pages/CourseC1"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-background font-bold text-xl">i</span>
      </div>
      <p className="text-muted-foreground">Laden...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kurse" element={<Courses />} />
            <Route path="/kurse/a1" element={<CourseA1 />} />
            <Route path="/kurse/a2" element={<CourseA2 />} />
            <Route path="/kurse/b1" element={<CourseB1 />} />
            <Route path="/kurse/b2" element={<CourseB2 />} />
            <Route path="/kurse/c1" element={<CourseC1 />} />
            <Route path="/telc-prufungen" element={<TelcOverview />} />
            <Route path="/telc-b1" element={<TelcB1 />} />
            <Route path="/telc-b2" element={<TelcB2 />} />
            <Route path="/telc-c1" element={<TelcC1 />} />
            <Route path="/warenkorb" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
