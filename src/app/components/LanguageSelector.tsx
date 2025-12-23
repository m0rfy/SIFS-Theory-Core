import { useTranslation } from 'react-i18next';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => changeLanguage('ru')}
        className={`px-3 py-1 rounded border ${
          i18n.language === 'ru'
            ? 'bg-blue-600 border-blue-400 text-white'
            : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/10'
        }`}
      >
        RU
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded border ${
          i18n.language === 'en'
            ? 'bg-blue-600 border-blue-400 text-white'
            : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/10'
        }`}
      >
        EN
      </button>
    </div>
  );
}
