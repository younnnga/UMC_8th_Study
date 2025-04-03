/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_TMDM_KEY : string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
