import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ParentBadgeProps {
  variant?: "parent-resource" | "teen-friendly" | "parent-info" | "new";
  className?: string;
}

const ParentBadge = ({ variant = "parent-resource", className = "" }: ParentBadgeProps) => {
  const variantConfig = {
    "parent-resource": {
      text: "PARENT RESOURCE",
      tooltip: "Resource for parents & mentors"
    },
    "teen-friendly": {
      text: "TEEN FRIENDLY",
      tooltip: "Age-appropriate for teens"
    },
    "parent-info": {
      text: "PARENT INFO",
      tooltip: "Information for parents & mentors"
    },
    "new": {
      text: "NEW",
      tooltip: "New section"
    }
  };

  const config = variantConfig[variant];

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-lg border transition-opacity ${
              variant === "new"
                ? "bg-gold text-white border-gold"
                : "bg-gold/15 text-gold border-gold"
            } ${className}`}
            aria-label={config.tooltip}
          >
            {config.text}
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-white text-foreground border shadow-lg">
          <p className="text-xs">{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ParentBadge;
