import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Download, RefreshCw, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MockupGenerator = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const { toast } = useToast();

  const generateMockup = async () => {
    setIsLoading(true);
    setImageUrl(null);
    setDescription(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-mockup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate mockup');
      }

      setImageUrl(data.imageUrl);
      setDescription(data.description);
      
      toast({
        title: 'Mockup Generated',
        description: 'Your carousel design mockup is ready!',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate mockup',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'carousel-mockup.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Download Started',
      description: 'Your mockup PNG is downloading.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              Carousel Design Mockup Generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Generate a professional PNG mockup of the Audience Programs Carousel design
            </p>
          </div>

          <Card className="border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-gold" />
                AI-Powered Mockup Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generation Controls */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={generateMockup}
                  disabled={isLoading}
                  size="lg"
                  className="bg-gold text-navy hover:bg-gold/90 font-bold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Generate Mockup
                    </>
                  )}
                </Button>
                
                {imageUrl && (
                  <Button
                    onClick={downloadImage}
                    variant="outline"
                    size="lg"
                    className="border-gold text-gold hover:bg-gold/10"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download PNG
                  </Button>
                )}
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  <Loader2 className="h-12 w-12 animate-spin text-gold mb-4" />
                  <p className="text-lg">Generating your carousel mockup...</p>
                  <p className="text-sm">This may take 15-30 seconds</p>
                </div>
              )}

              {/* Generated Image */}
              {imageUrl && !isLoading && (
                <div className="space-y-4">
                  <div className="border border-border rounded-lg overflow-hidden bg-muted/20">
                    <img
                      src={imageUrl}
                      alt="Generated carousel mockup"
                      className="w-full h-auto"
                    />
                  </div>
                  
                  {description && (
                    <p className="text-sm text-muted-foreground text-center italic">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Empty State */}
              {!imageUrl && !isLoading && (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                  <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
                  <p className="text-lg mb-2">No mockup generated yet</p>
                  <p className="text-sm">Click "Generate Mockup" to create a design preview</p>
                </div>
              )}

              {/* Design Specs Reference */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Design Specifications:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Navy background (#1a1a2e) with gold accents (#d4af37)</li>
                  <li>• 4-tab navigation: Boys, Men, Mentors, Parents</li>
                  <li>• 3 bundle cards with gradient headers and pricing</li>
                  <li>• Premium aesthetic matching the Poised Gentlemen brand</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MockupGenerator;
