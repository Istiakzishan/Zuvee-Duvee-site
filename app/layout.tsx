import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import CommerceExperience from "./CommerceExperience";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://zuvee-duvee.istiakzishan.chatgpt.site"),
  title: "Zuvee Duvee",
  description: "Thoughtfully selected play and essentials for growing little ones in Bangladesh.",
  other: { "codex-preview": "development" },
  openGraph: {
    title: "Zuvee Duvee",
    description: "Thoughtfully selected play and essentials for growing little ones in Bangladesh.",
    siteName: "Zuvee Duvee",
    locale: "en_BD",
    type: "website",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable}`}><CommerceExperience supabaseUrl={process.env.SUPABASE_URL ?? ""} publishableKey={process.env.SUPABASE_PUBLISHABLE_KEY ?? ""}>{children}</CommerceExperience></body></html>;
}
