import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Trust Guard Adjusters';
const DEFAULT_DESC =
  'Florida public adjusters fighting for homeowners. We document, negotiate, and recover what your insurance company owes you — on contingency.';
const DEFAULT_IMAGE = 'https://trustguardadjusters.com/og-image.jpg';
const SITE_URL = 'https://trustguardadjusters.com';

interface PageMetaProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

export default function PageMeta({ title, description, image, path = '' }: PageMetaProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const desc = description ?? DEFAULT_DESC;
  const img  = image ?? DEFAULT_IMAGE;
  const url  = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image"       content={img} />
      <meta property="og:url"         content={url} />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image"       content={img} />
    </Helmet>
  );
}
