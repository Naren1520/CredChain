
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import { BrowserRouter } from 'react-router-dom';
  import { AuthProvider } from './app/auth/AuthProvider';

  import ErrorBoundary from './app/ErrorBoundary';

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
  