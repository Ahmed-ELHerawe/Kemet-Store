import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import useStore from "./store";

// قراءة قيمة الثيم من الـ store مباشرة
const theme = useStore.getState().theme;

// تطبيق الـ class "dark" على عنصر الـ html حسب قيمة الثيم
document.documentElement.classList.toggle("dark", theme === "dark");

// الاستماع لتغييرات الثيم لتحديث الـ class تلقائيًا
useStore.subscribe((state) => {
  document.documentElement.classList.toggle("dark", state.theme === "dark");
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);