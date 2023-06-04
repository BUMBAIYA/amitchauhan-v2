import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/icon.svg" type="image/image+xml" />
      </Head>
      <body className="bg-white text-zinc-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
