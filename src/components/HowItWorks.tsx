import { ClipboardList, Settings, UserCheck, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    label: "INQUIRY",
    line: "Tell us about your school or organization and the boys you serve.",
  },
  {
    icon: Settings,
    label: "CUSTOM DESIGN",
    line: "We shape the program to your site, schedule, and group size.",
  },
  {
    icon: UserCheck,
    label: "DELIVERY",
    line: "Our certified facilitator runs Project Power at no cost to you.",
  },
  {
    icon: BarChart3,
    label: "OUTCOMES REPORTING",
    line: "You receive a summary of participation and outcomes you can share with your stakeholders.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">
                  {String(i + 1).padStart(2, "0")}. {step.label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.line}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
