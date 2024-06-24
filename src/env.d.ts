/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_RESEND_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
