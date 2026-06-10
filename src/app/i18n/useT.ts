import { useLanguage } from "./context";
import { translations } from "./translations";

export function useT() {
  const { language } = useLanguage();
  const t = translations[language] ?? translations["zh-CN"];
  return t;
}
