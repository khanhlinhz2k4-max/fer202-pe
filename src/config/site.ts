export interface NavLink {
  title: string;
  href: string;
}

export interface CTA {
  text: string;
  href: string;
}

export interface HeroContent {
  badge?: string;
  title: string;
  highlightText?: string;
  subtitle: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  description: string;
  navLinks: NavLink[];
  primaryCTA: CTA;
  secondaryCTA: CTA;
  hero: HeroContent;
  features: FeatureItem[];
  footer: {
    copyright: string;
    note?: string;
    links: NavLink[];
  };
}

export const siteConfig: SiteConfig = {
  siteName: "ShelfLife",
  tagline: "Personal Reading List & Book Tracker",
  description:
    "Keep a list of the books you want to read, are reading, or have finished, and see how much you have on your shelf.",

  navLinks: [
    { title: "Home", href: "/" },
    { title: "Books", href: "/books" },
  ],

  primaryCTA: {
    text: "Register",
    href: "/register",
  },

  secondaryCTA: {
    text: "Login",
    href: "/login",
  },

  hero: {
    badge: "FER202 Fall 2026",
    title: "ShelfLife",
    highlightText: "Your Personal Book Shelf",
    subtitle:
      "Keep a list of the books you want to read, are reading, or have finished, and see how much you have on your shelf.",
  },

  features: [
    {
      id: "add-books",
      tag: "Collection",
      title: "Add books",
      description:
        "Save books you want to read, are currently reading, or have finished with title, author, and page count.",
    },
    {
      id: "track-progress",
      tag: "Progress",
      title: "Track your progress",
      description:
        "Advance your reading status step by step from To Read to Reading and Finished as you complete each book.",
    },
    {
      id: "search-shelf",
      tag: "Discovery",
      title: "Search your shelf",
      description:
        "Filter your reading list by status, search by title or author, and view live page and status breakdowns.",
    },
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} ShelfLife. All rights reserved.`,
    note: "FER202 Practical Exam — ShelfLife Edition.",
    links: [
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Service", href: "#" },
      { title: "Support", href: "#" },
    ],
  },
};
