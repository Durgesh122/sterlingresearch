
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

// Apply saved theme immediately to avoid flash/flicker on first paint
try {
  const _saved = localStorage.getItem('theme');
  if (_saved === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
} catch (e) {
  // ignore (e.g., localStorage not available)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
