# Map3 Client Deposit SDK

## Getting Started

```
npm install @map3xyz/client-deposit-sdk
```

or

```
yarn add @map3xyz/client-deposit-sdk
```

```js
// index.js

import { initMap3Sdk } from '@map3xyz/client-deposit-sdk'
import '@map3xyz/client-deposit-sdk/dist/index.css'

const map3 = initMap3Sdk({ element: 'map3' })
map3.open()
```

### Install via CDN

You can also include a normal script and link tag if your app doesn't support module imports.

```html
// index.html
<html lang="en">
    <head>
        ...
        <script src="https://cdn.jsdelivr.net/npm/@map3xyz/client-deposit-sdk/dist/index.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@map3xyz/client-deposit-sdk/dist/index.css"></link>
    </head>

    <body>
        <button onClick="openSdk()">Open SDK</button>
    </body>
    <script>
        function openSdk() {
            const map3 = initMap3Sdk({ element: 'map3-element' })
            map3.open()
        }
    </script>
</html>
```
