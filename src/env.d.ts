/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_CHATBOT_ENABLED: string
}
interface ImportMeta { readonly env: ImportMetaEnv }


