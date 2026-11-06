import Link from "next/link";
import { siteConfig, type HeroContent, type CTA } from "@/config/site";
import { PageContainer } from "@/components/common/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  hero?: HeroContent;
  primaryCTA?: CTA;
  secondaryCTA?: CTA;
}

export function HeroSection({
  hero = siteConfig.hero,
  primaryCTA = siteConfig.primaryCTA,
  secondaryCTA = siteConfig.secondaryCTA,
}: HeroSectionProps) {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 overflow-hidden">
      <PageContainer>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6 sm:gap-8">
          {/* Badge */}
          {hero.badge && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase text-primary bg-secondary/80 border border-border/50">
              <span className="size-1.5 rounded-full bg-primary" />
              {hero.badge}
            </span>
          )}

          {/* Main Headline */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.15]">
            {hero.title}{" "}
            {hero.highlightText && (
              <span className="italic font-normal text-primary">
                {hero.highlightText}
              </span>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            {primaryCTA && (
              <Link
                href={primaryCTA.href}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full sm:w-auto px-8 shadow-md"
                )}
              >
                {primaryCTA.text}
              </Link>
            )}

            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto px-8"
                )}
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

