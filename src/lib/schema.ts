import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  LOCATION,
  MAAI_URL,
  MAAI_NAME,
  SERVICES,
} from "./constants";
import { BlogPost } from "./blog";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Savannah",
      addressRegion: "GA",
      addressCountry: "US",
    },
    parentOrganization: {
      "@type": "Organization",
      name: MAAI_NAME,
      url: MAAI_URL,
    },
    sameAs: [MAAI_URL],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function getBlogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: "MOCO by Maai Designs",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    wordCount: post.content.split(/\s+/).length,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MOCO Done-for-You Digital Services",
    description:
      "Done-for-you digital team handling website management, blog content, social media, newsletters, ads, reviews, and lead capture for small businesses.",
    provider: {
      "@type": "Organization",
      name: MAAI_NAME,
      url: MAAI_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Savannah",
        addressRegion: "GA",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "Place",
      name: LOCATION,
    },
    serviceType: SERVICES.map((s) => s.title),
  };
}
