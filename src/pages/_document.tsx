import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/icon.svg" type="image/image+xml" />
      </Head>
      <body className="bg-zinc-100 text-zinc-950 antialiased selection:bg-teal-600 selection:text-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:selection:bg-teal-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
