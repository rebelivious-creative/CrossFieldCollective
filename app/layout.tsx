import "../styles.css";

export const metadata = {
  title: "Crossfield Collective | SME Growth Infrastructure",
  description: "Building Growth Infrastructure for Ambitious SMEs",
  icons: {
    icon: "/assets/favicon.png", // Points directly to your custom public/assets/favicon.png
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}