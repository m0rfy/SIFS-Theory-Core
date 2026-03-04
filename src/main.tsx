import { createRoot } from "react-dom/client";
import { AppRouter } from "./app/router.tsx";
import "./styles/index.css";
import "./styles/ssf-2025.css";
import { ErrorBoundary } from "./app/components/ErrorBoundary";
import { initializeSpatialFramework } from "./app/utils/sifs-spatial-connector";
import { I18nProvider } from "./app/contexts/I18nContext";

// Инициализация SSF-2025
initializeSpatialFramework();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <I18nProvider>
      <AppRouter />
    </I18nProvider>
  </ErrorBoundary>
);
