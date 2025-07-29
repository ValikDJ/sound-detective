/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly BASE_URL: string;
  // Додайте інші змінні середовища, якщо вони будуть використовуватися
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}