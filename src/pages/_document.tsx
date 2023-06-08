import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/icon.svg" type="image/image+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="bg-zinc-100 text-zinc-950 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
