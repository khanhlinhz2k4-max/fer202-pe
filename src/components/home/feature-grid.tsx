import { siteConfig, type FeatureItem } from "@/config/site";
import { PageContainer } from "@/components/common/page-container";
import { SectionHeading } from "@/components/common/section-heading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureGridProps {
  badge?: string;
  title?: string;
  description?: string;
  features?: FeatureItem[];
  className?: string;
}

export function FeatureGrid({
  badge = "Key Pillars",
  title = "Core Principles",
  description = "Every detail is thoughtfully curated to embody natural balance, enduring quality, and quiet sophistication.",
  features = siteConfig.features,
  className,
}: FeatureGridProps) {
  return (
    <section id="features" className={cn("w-full py-16 sm:py-20 lg:py-24", className)}>
      <PageContainer>
        {/* Section Heading */}
        <SectionHeading
          badge={badge}
          title={title}
          description={description}
          className="mb-12"
        />

        {/* Feature Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            // Demonstrate two-tier surface hierarchy:
            // Highlight the 2nd card with soft-sage secondary surface for visual accent
            const isAccentCard = index === 1;

            return (
              <Card
                key={feature.id}
                className={cn(
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-1",
                  isAccentCard
                    ? "bg-surface-secondary border-primary/20"
                    : "bg-card border-border/50"
                )}
              >
                <CardHeader className="gap-2">
                  {feature.tag && (
                    <span
                      className={cn(
                        "inline-block w-fit text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
                        isAccentCard
                          ? "bg-background/80 text-foreground border-border/40"
                          : "bg-secondary text-foreground border-border/30"
                      )}
                    >
                      {feature.tag}
                    </span>
                  )}
                  <CardTitle className="text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-foreground/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
