import en from './en.json';
import es from './es.json';

export const languages = {
  es,
  en,
} as const;

export const defaultLang = 'es';

export type Lang = keyof typeof languages;


export type TranslationKey = Exclude<keyof typeof es, `_${string}`>;

export function useTranslations(lang: Lang) {
  return function t(
    key: TranslationKey,
    vars: Record<string, string | number> = {},
  ): string {
    const dict = languages[lang] || languages[defaultLang];
    const val =
      (dict as Record<string, string>)[key] ||
      (languages[defaultLang] as Record<string, string>)[key];

    const plantilla = val || key;

    return plantilla.replace(/\{(\w+)\}/g, (_, v) => String(vars[v] ?? ''));
  };
}