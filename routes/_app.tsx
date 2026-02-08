import { PageProps } from "fresh";

export default function App({ Component }: PageProps) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <link rel="stylesheet" href="/theme.css" />
        <title>Picker Frontend</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
