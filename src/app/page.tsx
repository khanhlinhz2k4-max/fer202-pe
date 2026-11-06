import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageContainer } from "@/components/common/page-container";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 flex flex-col justify-center py-16 sm:py-24">
        <PageContainer>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6 mb-16">
            <h1
              data-testid="home-title"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-accent"
            >
              ShelfLife
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {siteConfig.features.map((feature) => (
              <Card
                key={feature.id}
                className="bg-card border border-border/60 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-heading font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}
