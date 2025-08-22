import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "たまっぷ",
  description: "多摩センターの情報サイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}