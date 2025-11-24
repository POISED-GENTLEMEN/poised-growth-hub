import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Target, Heart, Users, Zap } from "lucide-react";

interface EQWelcomeProps {
  onStart: () => void;
}

export const EQWelcome = ({ onStart }: EQWelcomeProps) => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            The Poised Gentleman
            <span className="block text-gold mt-2">EQ Assessment</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measure your emotional intelligence and discover your path to mastery
          </p>
        </div>

        <Card className="p-8 mb-8 bg-card border-border animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Welcome, Brother</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            True strength isn't just physical - it's emotional. The Poised Gentleman understands that 
            emotional intelligence is the foundation of authentic leadership, meaningful relationships, 
            and genuine self-mastery.
          </p>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            This assessment measures your emotional intelligence across five critical dimensions. 
            Be honest with yourself - growth begins with self-awareness. There are no wrong answers, 
            only opportunities for development.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Time required:</strong> 10-15 minutes
            <br />
            <strong className="text-foreground">Questions:</strong> 25 thoughtful questions
            <br />
            <strong className="text-foreground">Result:</strong> Personalized development roadmap
          </p>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-card border-border animate-fade-in hover:border-gold transition-colors" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Self-Awareness</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Know thyself - the foundation of all growth
            </p>
          </Card>

          <Card className="p-6 bg-card border-border animate-fade-in hover:border-gold transition-colors" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Self-Regulation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Discipline over impulse - poise under pressure
            </p>
          </Card>

          <Card className="p-6 bg-card border-border animate-fade-in hover:border-gold transition-colors" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Motivation</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Purpose-driven pursuit of excellence
            </p>
          </Card>

          <Card className="p-6 bg-card border-border animate-fade-in hover:border-gold transition-colors" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Empathy</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Strength through understanding and connection
            </p>
          </Card>

          <Card className="p-6 bg-card border-border animate-fade-in hover:border-gold transition-colors" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Social Skills</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Lead with authenticity and respect
            </p>
          </Card>

          <Card className="p-6 bg-card border-border animate-fade-in hover:border-gold transition-colors" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-foreground">Your Path</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Personalized development roadmap
            </p>
          </Card>
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-gold text-gold-foreground hover:bg-gold/90 px-12 py-6 text-lg"
          >
            Begin Assessment
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Your responses are private and stored only on your device
          </p>
        </div>
      </div>
    </div>
  );
};
