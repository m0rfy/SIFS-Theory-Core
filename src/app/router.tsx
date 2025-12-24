import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PresentationPage } from './pages/PresentationPage';
import { DocsIndexPage } from './pages/DocsIndexPage';
import { DocPage } from './pages/DocPage';
import { SimulationsIndexPage } from './pages/simulations/SimulationsIndexPage';
import { CollapseSimulationPage } from './pages/simulations/CollapseSimulationPage';
import { TemporalSyncPage } from './pages/simulations/TemporalSyncPage';
import { InteractiveCalculationsPage } from './pages/simulations/InteractiveCalculationsPage';
import { VisualizationsPage } from './pages/simulations/VisualizationsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'docs',
        element: <DocsIndexPage />,
      },
      {
        path: 'docs/:category/*',
        element: <DocPage />,
      },
      {
        path: 'simulations',
        element: <SimulationsIndexPage />,
      },
      {
        path: 'simulations/collapse',
        element: <CollapseSimulationPage />,
      },
      {
        path: 'simulations/temporal',
        element: <TemporalSyncPage />,
      },
      {
        path: 'simulations/calculations',
        element: <InteractiveCalculationsPage />,
      },
      {
        path: 'simulations/visualizations',
        element: <VisualizationsPage />,
      },
      {
        path: 'presentation',
        element: <PresentationPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
