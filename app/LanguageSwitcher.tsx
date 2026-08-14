"use client";

import { useEffect, useState } from "react";

type Language = "en" | "bn";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("zuvee-language") === "bn" ? "bn" : "en";
  });

  useEffect(() => {
    document.documentElement.dataset.lang = language;
    document.documentElement.lang = language === "bn" ? "bn" : "en";
  }, [language]);

  function choose(next: Language) {
    setLanguage(next);
    window.localStorage.setItem("zuvee-language", next);
  }

  return (
    <div className="language-switcher" aria-label="Language switcher">
      <button type="button" className={language === "en" ? "active" : ""} onClick={() => choose("en")} aria-pressed={language === "en"}>EN</button>
      <button type="button" className={language === "bn" ? "active" : ""} onClick={() => choose("bn")} aria-pressed={language === "bn"}>বাংলা</button>
    </div>
  );
}
