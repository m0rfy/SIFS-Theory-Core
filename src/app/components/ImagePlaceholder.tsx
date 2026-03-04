/**
 * ImagePlaceholder — заглушка для изображений до их добавления.
 *
 * Использование:
 *   <ImagePlaceholder id="hero-banner" label="Баннер главной страницы" aspect="16/9" />
 *
 * После добавления изображения замените на:
 *   <img src={`./images/${id}.webp`} alt={label} ... />
 */

interface ImagePlaceholderProps {
  /** Уникальный идентификатор — имя файла без расширения в public/images/ */
  id: string;
  /** Описание изображения */
  label?: string;
  /** Рекомендуемое разрешение или соотношение сторон */
  hint?: string;
  /** CSS aspect-ratio (например '16/9', '1/1', '4/3') */
  aspect?: string;
  /** Дополнительный класс */
  className?: string;
}

export function ImagePlaceholder({
  id,
  label,
  hint,
  aspect = '16/9',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl ${className}`}
      style={{
        aspectRatio: aspect,
        background: 'rgba(255,255,255,0.02)',
        border: '1.5px dashed rgba(34,211,238,0.2)',
      }}
      data-image-id={id}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Camera icon */}
      <svg
        className="relative mb-2 opacity-20"
        style={{ color: '#22d3ee', width: '32px', height: '32px' }}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
        />
      </svg>

      {label && (
        <span
          className="relative text-xs font-medium text-center px-4 opacity-40"
          style={{ color: '#94a3b8', fontFamily: 'DM Sans, sans-serif' }}
        >
          {label}
        </span>
      )}

      {hint && (
        <span
          className="relative mt-1 text-[10px] opacity-25"
          style={{ color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}
        >
          {hint}
        </span>
      )}

      {/* File name badge */}
      <span
        className="absolute bottom-2 right-2 text-[9px] px-1.5 py-0.5 rounded opacity-30"
        style={{
          color: '#22d3ee',
          background: 'rgba(34,211,238,0.08)',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        public/images/{id}.*
      </span>
    </div>
  );
}
