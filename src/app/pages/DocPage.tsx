/**
 * DocPage - Страница отдельного документа
 */

import { useParams } from 'react-router-dom';

export function DocPage() {
  const { category } = useParams();
  
  return (
    <div className="spatial-page-block spatial-monolith">
      <h1 className="text-4xl font-bold mb-8">Документ: {category}</h1>
      <p className="text-gray-400">Контент документа будет здесь...</p>
    </div>
  );
}
