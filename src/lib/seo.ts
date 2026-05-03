export interface SEOProps {
  title:       string;
  description: string;
  image?:      string;
  canonical?:  string;
  noIndex?:    boolean;
  type?:       'website' | 'article' | 'profile';
  pubDate?:    Date;
}

const SITE_NAME  = 'Ahmad Alharbi';
const SITE_URL   = 'https://ahmadalallasi.com';
const DEFAULT_OG = '/og-default.svg';

export function buildSEO(props: SEOProps) {
  const { title, description, image = DEFAULT_OG, canonical = SITE_URL, noIndex = false, type = 'website' } = props;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  return { title: fullTitle, description, image: fullImage, canonical, noIndex, type, openGraph: { title: fullTitle, description, image: fullImage, type, siteName: SITE_NAME }, twitter: { card: 'summary_large_image', title: fullTitle, description, image: fullImage } };
}

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ahmad Alharbi',
    jobTitle: 'Digital Marketing Specialist',
    url: SITE_URL,
    sameAs: [],
    address: { '@type': 'PostalAddress', addressCountry: 'SA' },
    knowsAbout: ['Digital Marketing', 'Web Development', 'Business Automation', 'SEO'],
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ar',
    potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/blog?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
  };
}

export function buildArticleSchema(title: string, description: string, pubDate: Date, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: pubDate.toISOString(),
    author: { '@type': 'Person', name: 'Ahmad Alharbi', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Ahmad Alharbi' },
    url,
    inLanguage: 'ar',
  };
}
