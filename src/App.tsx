import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import TelcB1 from "./pages/TelcB1";
import TelcB2 from "./pages/TelcB2";
import TelcC1 from "./pages/TelcC1";
import Courses from "./pages/Courses";
import CourseA1 from "./pages/CourseA1";
import CourseA2 from "./pages/CourseA2";
import CourseB1 from "./pages/CourseB1";
import CourseB2 from "./pages/CourseB2";
import CourseC1 from "./pages/CourseC1";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kurse" element={<Courses />} />
            <Route path="/kurse/a1" element={<CourseA1 />} />
            <Route path="/kurse/a2" element={<CourseA2 />} />
            <Route path="/kurse/b1" element={<CourseB1 />} />
            <Route path="/kurse/b2" element={<CourseB2 />} />
            <Route path="/kurse/c1" element={<CourseC1 />} />
            <Route path="/telc-b1" element={<TelcB1 />} />
            <Route path="/telc-b2" element={<TelcB2 />} />
            <Route path="/telc-c1" element={<TelcC1 />} />
            <Route path="/warenkorb" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
