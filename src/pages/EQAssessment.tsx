import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EQWelcome } from "@/components/eq/EQWelcome";
import { EQQuestions } from "@/components/eq/EQQuestions";
import { EQResultsComponent } from "@/components/eq/EQResults";
import { calculateResults, EQResults } from "@/data/eqQuestions";
import { useCanonical } from "@/hooks/useCanonical";

type Stage = 'welcome' | 'questions' | 'results';

const EQAssessment = () => {
  useCanonical();
  const [stage, setStage] = useState<Stage>('welcome');
  const [results, setResults] = useState<EQResults | null>(null);

  useEffect(() => {
    // Load saved results from localStorage if available
    const savedResults = localStorage.getItem('eqAssessmentResults');
    if (savedResults) {
      try {
        setResults(JSON.parse(savedResults));
      } catch (e) {
        // Invalid saved data, ignore
      }
    }
  }, []);

  const handleStart = () => {
    setStage('questions');
    setResults(null);
  };

  const handleComplete = (answers: Record<number, number>) => {
    const calculatedResults = calculateResults(answers);
    setResults(calculatedResults);
    
    // Save results to localStorage
    localStorage.setItem('eqAssessmentResults', JSON.stringify(calculatedResults));
    localStorage.setItem('eqAssessmentDate', new Date().toISOString());
    
    setStage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setStage('welcome');
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {stage === 'welcome' && <EQWelcome onStart={handleStart} />}
        {stage === 'questions' && <EQQuestions onComplete={handleComplete} />}
        {stage === 'results' && results && (
          <EQResultsComponent results={results} onRetake={handleRetake} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EQAssessment;
