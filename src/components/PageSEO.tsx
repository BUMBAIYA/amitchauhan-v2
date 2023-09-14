import Head from "next/head";
import { useRouter } from "next/router";
import { siteMetadata } from "@/data/siteMetaData";

type PageSEOProps = {
  title: string;
  description: string;
  ogType: string;
  ogImage:
    | string
    | {
        "@type": string;
        url: string;
      }[];
};

export function PageSEO({ title, description, ogType, ogImage }: PageSEOProps) {
  const router = useRouter();

  const siteUrl = siteMetadata.siteUrl + router.asPath;
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />

      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => (
          <meta property="og:image" content={url} key={url} />
        ))
      ) : (
        <meta property="og:image" content={siteMetadata.image} key={ogImage} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={siteMetadata.twitterImage} />
    </Head>
  );
}
