# Tailwind CSS のビルド

```bash
# cssビルドのためにpostcssコマンドを使用できるようにする
$ npm i -D postcss-cli
```

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    // cssのビルド -> Next.jsのビルド
    "build": "postcss styles/tailwind.css -o styles/tailwind-bundle.css && next build",
    // cssのビルド（ウォッチモード）
    "build:css": "TAILWIND_MODE=watch postcss styles/tailwind.css -o styles/tailwind-bundle.css -w",
    "start": "next start",
    "lint": "next lint"
  }
}
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

```tsx
// _app.tsx
import 'styles/tailwind-bundle.css'
import 'styles/globals.scss'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
```

```bash
# 同時に実行
$ npm run dev
$ npm run build:css
```
