import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useEffect } from "react";
import RedirectGate from "./components/RedirectGate";
import { installBookCallDelegate } from "./lib/analytics";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import ProgramPartners from "./pages/ProgramPartners";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import ForMomsMentors from "./pages/ForMomsMentors";
import EQAssessment from "./pages/EQAssessment";
import ArticleDetail from "./pages/ArticleDetail";
import MentorshipPrograms from "./pages/MentorshipPrograms";
import MockupGenerator from "./pages/MockupGenerator";
import Schools from "./pages/Schools";
import SchoolsOnePager from "./pages/SchoolsOnePager";
import SchoolsOnePagerThankYou from "./pages/SchoolsOnePagerThankYou";
import Codex from "./pages/Codex";
import CodexArticle, { codexArticleSlugs } from "./pages/CodexArticle";
import Essence from "./pages/Essence";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";
import LegalPage from "./pages/LegalPage.jsx";

const queryClient = new QueryClient();

const CodexOrArticleRouter = () => {
  const { slug } = useParams<{ slug: string }>();
  if (slug && codexArticleSlugs.includes(slug)) {
    return <CodexArticle />;
  }
  return <ArticleDetail />;
};

const App = () => {
  useEffect(() => {
    installBookCallDelegate();
  }, []);
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectGate />
        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/" element={<Programs />} />
          <Route path="/programs/partners" element={<ProgramPartners />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/schools/" element={<Schools />} />
          <Route path="/schools/one-pager" element={<SchoolsOnePager />} />
          <Route path="/schools/one-pager/" element={<SchoolsOnePager />} />
          <Route path="/schools/one-pager/thank-you" element={<SchoolsOnePagerThankYou />} />
          <Route path="/schools/one-pager/thank-you/" element={<SchoolsOnePagerThankYou />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/codex" element={<Codex />} />
          <Route path="/codex/" element={<Codex />} />
          <Route path="/codex/:slug" element={<CodexOrArticleRouter />} />
          <Route path="/codex/:slug/" element={<CodexOrArticleRouter />} />
          <Route path="/resources" element={<Resources />} /> {/* Legacy redirect */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/for-moms-mentors" element={<ForMomsMentors />} />
          <Route path="/eq-assessment" element={<EQAssessment />} />
          <Route path="/essence" element={<Essence />} />
          <Route path="/essence/" element={<Essence />} />
          <Route path="/mentorship-programs" element={<MentorshipPrograms />} />
          <Route path="/mockup-generator" element={<MockupGenerator />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="/unsubscribe/" element={<Unsubscribe />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/legal/" element={<LegalPage />} />
          <Route path="/request-proposal" element={<Schools />} />
          <Route path="/request-proposal/" element={<Schools />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};


export default App;
