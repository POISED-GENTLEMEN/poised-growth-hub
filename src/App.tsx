import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import ProgramPartners from "./pages/ProgramPartners";
import ShopifyShop from "./pages/ShopifyShop";
import ShopifyProductDetail from "./pages/ShopifyProductDetail";
import ShopifyCart from "./pages/ShopifyCart";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import ForMomsMentors from "./pages/ForMomsMentors";
import MentorTraining from "./pages/MentorTraining";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/partners" element={<ProgramPartners />} />
          <Route path="/programs/mentor-training" element={<MentorTraining />} />
          <Route path="/shop" element={<ShopifyShop />} />
          <Route path="/shop/:handle" element={<ShopifyProductDetail />} />
          <Route path="/cart" element={<ShopifyCart />} />
          <Route path="/about" element={<About />} />
          <Route path="/codex" element={<Resources />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/for-moms-mentors" element={<ForMomsMentors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
