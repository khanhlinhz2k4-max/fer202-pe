import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/common/logo";
import { PageContainer } from "@/components/common/page-container";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card/40 backdrop-blur-xs transition-colors py-10 mt-auto">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <Logo />
            <p className="text-sm text-foreground/80 font-medium">
              {siteConfig.tagline}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Policy Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Information
            </h4>
            <ul className="flex flex-col gap-2">
              {siteConfig.footer.links.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>{siteConfig.footer.copyright}</p>
          {siteConfig.footer.note && <p>{siteConfig.footer.note}</p>}
        </div>
      </PageContainer>
    </footer>
  );
}
