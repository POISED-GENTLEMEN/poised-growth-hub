import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EQResults, getDevelopmentRecommendations } from "@/data/eqQuestions";
import { Download, RefreshCw, Share2, TrendingUp, Award, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EQResultsProps {
  results: EQResults;
  onRetake: () => void;
}

export const EQResultsComponent = ({ results, onRetake }: EQResultsProps) => {
  const handleDownload = () => {
    const resultsText = `
THE POISED GENTLEMAN EQ ASSESSMENT RESULTS
==========================================

Overall Score: ${results.totalScore} / ${results.maxScore}
Level: ${results.level}

${results.levelDescription}

DIMENSION BREAKDOWN:
-------------------
${results.dimensionScores.map(d => 
  `${d.dimension}: ${d.score}/25 (${d.percentage.toFixed(0)}%)`
).join('\n')}

STRENGTHS:
---------
${results.strengths.length > 0 ? results.strengths.join(', ') : 'Continue developing all dimensions'}

DEVELOPMENT AREAS:
-----------------
${results.developmentAreas.join(', ')}

Visit thepoisedgentleman.com for resources and guidance on your development journey.
    `.trim();

    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'poised-gentleman-eq-results.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Results Downloaded",
      description: "Your EQ assessment results have been saved."
    });
  };

  const handleShare = () => {
    const shareText = `I just completed The Poised Gentleman EQ Assessment and achieved ${results.level} status! Discover your emotional intelligence level.`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My EQ Assessment Results',
        text: shareText,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: "Share text copied! Paste it anywhere to share your achievement."
      });
    }
  };

  const getLevelColor = (level: string) => {
    if (level.includes('Poised')) return 'text-gold';
    if (level.includes('Accomplished')) return 'text-primary';
    if (level.includes('Developing')) return 'text-blue-500';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Award className="w-16 h-16 mx-auto mb-4 text-gold" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Your EQ Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Understanding your emotional intelligence landscape
          </p>
        </div>

        {/* Overall Score */}
        <Card className="p-8 mb-8 bg-card border-2 border-gold animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="text-center">
            <div className="mb-6">
              <div className={`text-6xl font-bold mb-2 ${getLevelColor(results.level)}`}>
                {results.totalScore}
              </div>
              <div className="text-2xl text-muted-foreground">out of {results.maxScore} points</div>
            </div>
            
            <div className="max-w-md mx-auto mb-6">
              <Progress value={(results.totalScore / results.maxScore) * 100} className="h-4" />
            </div>

            <div className={`text-3xl font-bold mb-3 ${getLevelColor(results.level)}`}>
              {results.level}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {results.levelDescription}
            </p>
          </div>
        </Card>

        {/* Dimension Breakdown */}
        <Card className="p-8 mb-8 bg-card border-border animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Dimension Breakdown</h2>
          </div>
          
          <div className="space-y-6">
            {results.dimensionScores.map((dimension, index) => (
              <div key={dimension.dimension} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{dimension.dimension}</span>
                  <span className="text-sm text-muted-foreground">
                    {dimension.score} / {dimension.maxScore} ({dimension.percentage.toFixed(0)}%)
                  </span>
                </div>
                <Progress value={dimension.percentage} className="h-3" />
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths */}
        {results.strengths.length > 0 && (
          <Card className="p-8 mb-8 bg-card border-border animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-gold" />
              <h2 className="text-2xl font-bold text-foreground">Your Strengths</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              You demonstrate mastery in these dimensions. Continue leveraging these strengths:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {results.strengths.map((strength) => (
                <div key={strength} className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="font-medium text-foreground">{strength}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Development Areas */}
        {results.developmentAreas.length > 0 && (
          <Card className="p-8 mb-8 bg-card border-border animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Development Roadmap</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              These areas represent your greatest opportunities for growth. Focus here to elevate your emotional intelligence:
            </p>
            
            <div className="space-y-8">
              {results.developmentAreas.map((area) => {
                const recommendations = getDevelopmentRecommendations(area);
                return (
                  <div key={area} className="border-l-4 border-gold pl-6">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">{area}</h3>
                    <ul className="space-y-3">
                      {recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Poised Gentleman Principles */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-gold/5 border-border animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-2xl font-bold mb-6 text-foreground">The Poised Gentleman Path</h2>
          
          <div className="space-y-6">
            <blockquote className="border-l-4 border-gold pl-6 italic text-lg text-foreground">
              "Knowing yourself is the beginning of all wisdom." — Aristotle
            </blockquote>

            <div>
              <h3 className="font-semibold mb-3 text-foreground">Your Next Steps This Week:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold">1.</span>
                  <span className="text-muted-foreground">Choose one development area and commit to one daily practice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold">2.</span>
                  <span className="text-muted-foreground">Journal about a recent emotional reaction and what it taught you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold">3.</span>
                  <span className="text-muted-foreground">Have one authentic conversation where you practice active listening</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold">4.</span>
                  <span className="text-muted-foreground">Read one article or watch one video about your development areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold">5.</span>
                  <span className="text-muted-foreground">Retake this assessment in 30 days to measure your progress</span>
                </li>
              </ul>
            </div>

            <div className="bg-background/50 rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-3 text-foreground">Recommended Resources:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>📚 "Emotional Intelligence 2.0" by Travis Bradberry</li>
                <li>📚 "Meditations" by Marcus Aurelius</li>
                <li>🎧 The Poised Gentleman Podcast episodes on emotional mastery</li>
                <li>🎯 Join our mentorship program for guided development</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download Results
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Achievement
          </Button>
          <Button
            onClick={onRetake}
            className="bg-gold text-gold-foreground hover:bg-gold/90 gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Assessment
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Remember: Emotional intelligence is a journey, not a destination. Every gentleman is a work in progress.
        </p>
      </div>
    </div>
  );
};
