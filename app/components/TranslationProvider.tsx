"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { IntlProvider } from "react-intl";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import hi from "../locales/hi.json";

const messages: Record<string, any> = { en, fr, hi };

interface TranslationProviderProps {
  children: ReactNode;
}

export default function TranslationProvider({ children }: TranslationProviderProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en"; 

  return (
    <IntlProvider locale={locale} messages={messages[locale] || messages.en}>
      {children}
    </IntlProvider>
  );
}
