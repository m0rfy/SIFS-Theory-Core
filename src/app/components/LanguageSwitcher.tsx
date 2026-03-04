/**
 * LanguageSwitcher Component
 * 
 * T106: Language switcher (RU/EN) in floating navigation
 * - Flag icon or text
 * - Integration with I18nContext
 * - No page reload on language change
 */

import { useLanguage, useTranslation } from '@/app/contexts/I18nContext';
import { Button } from '@/app/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'icon' | 'text' | 'both';
}

export function LanguageSwitcher({ 
  className,
  variant = 'both' 
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation('common');

  const languages = [
    { code: 'ru' as const, label: 'Русский', flag: '🇷🇺' },
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 text-slate-300 hover:text-white hover:bg-slate-800/50",
            "transition-colors duration-200",
            className
          )}
          aria-label={t('languageSwitcher') || 'Switch language'}
        >
          {variant === 'icon' || variant === 'both' ? (
            <Languages className="h-4 w-4" />
          ) : null}
          {variant === 'text' || variant === 'both' ? (
            <span className="flex items-center gap-1.5">
              <span>{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "cursor-pointer",
              language === lang.code && "bg-slate-800 text-white"
            )}
          >
            <span className="flex items-center gap-2 w-full">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {language === lang.code && (
                <span className="ml-auto text-xs">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
