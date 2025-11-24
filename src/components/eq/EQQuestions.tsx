import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { eqQuestions, dimensionInfo } from "@/data/eqQuestions";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EQQuestionsProps {
  onComplete: (answers: Record<number, number>) => void;
}

export const EQQuestions = ({ onComplete }: EQQuestionsProps) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { dimension: 'self-awareness', questions: eqQuestions.slice(0, 5) },
    { dimension: 'self-regulation', questions: eqQuestions.slice(5, 10) },
    { dimension: 'motivation', questions: eqQuestions.slice(10, 15) },
    { dimension: 'empathy', questions: eqQuestions.slice(15, 20) },
    { dimension: 'social-skills', questions: eqQuestions.slice(20, 25) }
  ];

  const currentDimension = sections[currentSection].dimension as keyof typeof dimensionInfo;
  const currentQuestions = sections[currentSection].questions;
  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / 25) * 100;
  const canProceed = currentQuestions.every(q => answers[q.id] !== undefined);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: parseInt(value) }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (totalAnswered === 25) {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scaleLabels = [
    { value: 1, label: "Rarely/Never" },
    { value: 2, label: "Occasionally" },
    { value: 3, label: "Sometimes" },
    { value: 4, label: "Often" },
    { value: 5, label: "Almost Always" }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Section {currentSection + 1} of 5
            </span>
            <span className="text-sm text-muted-foreground">
              {totalAnswered} / 25 questions completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Section Header */}
        <Card className="p-8 mb-8 bg-card border-border animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{dimensionInfo[currentDimension].icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {dimensionInfo[currentDimension].title}
              </h2>
              <p className="text-muted-foreground mt-1">
                {dimensionInfo[currentDimension].description}
              </p>
            </div>
          </div>
        </Card>

        {/* Questions */}
        <div className="space-y-8">
          {currentQuestions.map((question, index) => (
            <Card 
              key={question.id} 
              className="p-6 bg-card border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-medium mb-6 text-foreground leading-relaxed">
                {question.question}
              </h3>
              
              <RadioGroup
                value={answers[question.id]?.toString()}
                onValueChange={(value) => handleAnswer(question.id, value)}
              >
                <div className="space-y-3">
                  {scaleLabels.map(({ value, label }) => (
                    <div 
                      key={value}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={value.toString()} id={`q${question.id}-${value}`} />
                      <Label 
                        htmlFor={`q${question.id}-${value}`}
                        className="flex-1 cursor-pointer text-foreground"
                      >
                        <span className="font-medium">{value}</span> - {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 animate-fade-in">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-gold text-gold-foreground hover:bg-gold/90 gap-2"
          >
            {currentSection < sections.length - 1 ? 'Next Section' : 'View Results'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
