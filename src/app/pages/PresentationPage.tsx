import { PresentationApp } from './PresentationApp';

export function PresentationPage() {
  return (
    <div className="relative">
      {/* Информационное сообщение о скрытой странице */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-sm text-yellow-200 backdrop-blur-sm">
        <p>⚠️ Это скрытая страница презентации. Доступна только по прямой ссылке.</p>
      </div>
      
      <PresentationApp />
    </div>
  );
}
