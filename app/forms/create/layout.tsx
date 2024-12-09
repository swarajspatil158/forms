import type { Metadata } from "next";
import { cn } from "@/lib/utils";



export const metadata: Metadata = {
  title: "Create Form",
  description: "Form builder app created by Next.js, Shadcn, TailwindCSS",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest',
}
export default function CreateFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background w-screen overflow-x-hidden font-sans antialiased",
        
        )}
      >
        {children}
      </body>
    </html>
  );
}
